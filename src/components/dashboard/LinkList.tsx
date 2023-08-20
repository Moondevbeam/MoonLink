import React from 'react';

interface LinkListProps {
  links: any[];
}

function LinkList({ links }: LinkListProps) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.id} className="mb-2">
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default LinkList;
