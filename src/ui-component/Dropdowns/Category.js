import { MenuItem, Select } from '@mui/material';
import Category from 'data/category';
import PropTypes from 'prop-types';

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
    return (
        <Select name="category" value={selectedCategory} onChange={onCategoryChange} displayEmpty fullWidth>
            {Category.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                    {category.name}
                </MenuItem>
            ))}
        </Select>
    );
};

CategoryDropdown.propTypes = {
    selectedCategory: PropTypes.string,
    onCategoryChange: PropTypes.func
};
export default CategoryDropdown;
