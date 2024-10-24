import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/categories/${category.name.toLowerCase()}`}
      className="flex-none w-32 h-32 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center"
    >
      <img src={category.image} alt={category.name} className="h-16 w-16 mb-2" />
      <span className="text-center font-medium">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
