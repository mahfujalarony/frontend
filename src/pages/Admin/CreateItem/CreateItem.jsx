import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Form, Select, Card, message, InputNumber } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new'; 
import ImageUploading from 'react-images-uploading';
import 'react-quill-new/dist/quill.snow.css'; 

const { Option } = Select;

const CreateItem = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 5;
    const [errorMessage, setErrorMessage] = useState('');

    const { 
        handleSubmit, 
        control, 
        reset, 
        formState: { errors, isSubmitting } 
    } = useForm();

    const onChange = (imageList) => {
        setImages(imageList);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // সাধারণ ডাটাগুলো অ্যাপেন্ড করা
            formData.append('name', data.name);
            formData.append('price', data.price); 
            formData.append('stock', data.stock);
            formData.append('category', data.category);
            formData.append('description', data.description); 
            
            if (data.oldPrice) {
                formData.append('oldPrice', data.oldPrice);
            }

            // ইমেজ ফাইলগুলো লুপ করে অ্যাপেন্ড করা
            images.forEach((image) => {
                formData.append('images', image.file); 
            });

            const apiUrl = 'http://localhost:3001/api';

            const response = await fetch(`${apiUrl}/products/create`, {
                method: 'POST',
                body: formData, 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            message.success('Product created successfully!');
            reset();
            setImages([]); 
            setErrorMessage('');

        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            message.error(`Error: ${error.message}`);
        }
    };

    const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys', 'Automotive', 'Books'];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };

    // ✅ এখানে পরিবর্তন - 'bullet' সরিয়ে দিন
    const formats = [
        'header', 
        'bold', 
        'italic', 
        'underline', 
        'strike', 
        'blockquote',
        'list',        // 'bullet' এবং 'ordered' উভয়ের জন্য 'list' যথেষ্ট
        'indent', 
        'link', 
        'image', 
        'color', 
        'background'
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', paddingBottom: '50px' }}>
            <Card title="Add New Product" variant="outlined">
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    
                    {/* Product Name */}
                    <Form.Item 
                        label="Product Name" 
                        validateStatus={errors.name ? 'error' : ''} 
                        help={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Product name is required', minLength: { value: 3, message: 'Min length is 3' } }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter product name" />
                            )}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        {/* Price */}
                        <Form.Item 
                            label="Price" 
                            style={{ flex: 1 }} 
                            validateStatus={errors.price ? 'error' : ''} 
                            help={errors.price?.message}
                        >
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: 'Price is required', min: { value: 0, message: 'Price cannot be negative' } }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }} 
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        placeholder="0.00"
                                    />
                                )}
                            />
                        </Form.Item>

                        {/* Old Price (Optional) */}
                        <Form.Item 
                            label="Old Price (Optional)" 
                            style={{ flex: 1 }} 
                            validateStatus={errors.oldPrice ? 'error' : ''} 
                            help={errors.oldPrice?.message}
                        >
                            <Controller
                                name="oldPrice"
                                control={control}
                                rules={{ min: { value: 0, message: 'Price cannot be negative' } }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        placeholder="0.00"
                                    />
                                )}
                            />
                        </Form.Item>

                        {/* Stock */}
                        <Form.Item 
                            label="Stock Quantity" 
                            style={{ flex: 1 }} 
                            validateStatus={errors.stock ? 'error' : ''} 
                            help={errors.stock?.message}
                        >
                            <Controller
                                name="stock"
                                control={control}
                                rules={{ required: 'Stock is required', min: { value: 0, message: 'Stock cannot be negative' } }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                        placeholder="0"
                                        precision={0} 
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>

                    {/* Category */}
                    <Form.Item label="Category" validateStatus={errors.category ? 'error' : ''} help={errors.category?.message}>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                                <Select 
                                    {...field}
                                    placeholder="Select a category"
                                >
                                    {categories.map(category => (
                                        <Option key={category} value={category}>{category}</Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>

                    {/* Image Upload Section */}
                    <Form.Item label="Product Images">
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <div className="upload__image-wrapper">
                                    <div 
                                        style={{ 
                                            border: isDragging ? '2px dashed red' : '1px dashed #d9d9d9', 
                                            padding: '20px', 
                                            textAlign: 'center', 
                                            backgroundColor: '#fafafa',
                                            cursor: 'pointer',
                                            marginBottom: '10px',
                                            borderRadius: '5px'
                                        }}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <UploadOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                                        </p>
                                        <p className="ant-upload-text">Click or Drop images here</p>
                                    </div>

                                    {imageList.length > 0 && (
                                        <Button danger size="small" onClick={onImageRemoveAll} style={{ marginBottom: '10px' }}>
                                            Remove All Images
                                        </Button>
                                    )}

                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {imageList.map((image, index) => (
                                            <div key={index} style={{ position: 'relative', border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }}>
                                                <img src={image['data_url']} alt="" width="100" height="100" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                                                <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <Button size="small" icon={<EditOutlined />} onClick={() => onImageUpdate(index)} />
                                                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => onImageRemove(index)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </Form.Item>

                    {/* Description */}
                    <Form.Item label="Description" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'Description is required' }}
                            render={({ field }) => (
                                <ReactQuill 
                                    theme="snow"
                                    value={field.value || ''} 
                                    onChange={field.onChange}
                                    modules={modules}
                                    formats={formats}
                                    style={{ height: '200px', marginBottom: '50px' }}
                                    placeholder="Product description goes here..."
                                />
                            )}
                        />
                    </Form.Item>

                    {/* Error Message */}
                    {errorMessage && (
                        <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmitting} block size="large" style={{ marginTop: '20px' }}>
                            Create Product
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
};

export default CreateItem;