import React, { useState } from 'react';
import { DownOutlined, EnvironmentOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Dropdown, Input, Button, Divider } from 'antd';

const LocationDropDown = ({ location, onLocationChange }) => {
  // parent navbar theke location neteci
  // jodi oikan theke na pawa jai tahole fallback hidabe dhaka
  const [selectedLocation, setSelectedLocation] = useState(location || 'Dhaka');
  const [locations, setLocations] = useState([
    'Dhaka',
    'Chittagong',
    'Sylhet',
  ]);
  const [newLocation, setNewLocation] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);


  // akan theke updated location navbar component e patailam
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setDropdownVisible(false);
    if (onLocationChange) {
      onLocationChange(location);
    }
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      const updatedLocations = [...locations, newLocation.trim()];
      setLocations(updatedLocations);
      setNewLocation('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddLocation();
    }
  };

  const menuItems = (
    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-70">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
          Select Delivery Location
        </p>
      </div>

      {/* Location List */}
      <div className="max-h-75 overflow-y-auto py-2">
        {locations.map((location, index) => (
          <div
            key={index}
            onClick={() => handleLocationSelect(location)}
            className={`
              px-4 py-2.5 cursor-pointer transition-all duration-200
              flex items-center justify-between group
              ${selectedLocation === location 
                ? 'bg-linear-to-r from-purple-50 to-pink-50 text-purple-700' 
                : 'hover:bg-gray-50 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <EnvironmentOutlined 
                className={`text-base ${
                  selectedLocation === location ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'
                }`} 
              />
              <span className={`font-medium ${selectedLocation === location ? 'font-semibold' : ''}`}>
                {location}
              </span>
            </div>
            {selectedLocation === location && (
              <CheckOutlined className="text-purple-600 font-bold" />
            )}
          </div>
        ))}
      </div>

      <Divider className="my-2" />

      {/* Add New Location */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-500 font-semibold mb-2">Add New Location</p>
        <div className="flex gap-2">
          <Input
            placeholder="Enter place name"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            prefix={<PlusOutlined className="text-gray-400" />}
            className="flex-1"
            size="middle"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddLocation}
            disabled={!newLocation.trim()}
            className="bg-linear-to-r from-purple-500 to-pink-500 border-none hover:from-purple-600 hover:to-pink-600"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dropdown
      popupRender={() => menuItems}
      trigger={['click']}
      open={dropdownVisible}
      onOpenChange={setDropdownVisible}
      placement="bottomLeft"
    >
      <div 
        className="flex flex-col border-l pl-4 border-gray-300 leading-tight cursor-pointer group"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <span className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors duration-200">
          Delivering to <DownOutlined className="text-[10px] group-hover:translate-y-0.5 transition-transform" />
        </span>
        <span className="font-semibold bg-linear-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent flex items-center gap-1">
          <span className="text-lg">📍</span> {selectedLocation}
        </span>
      </div>
    </Dropdown>
  );
};

export default LocationDropDown;