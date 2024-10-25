import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/categories/${category.name.toLowerCase()}`}
      className="flex-nonep py-2 px-5 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center"
    >
      <span className="text-center font-medium whitespace-nowrap">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
