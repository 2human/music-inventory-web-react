import React from 'react';

export const SingleRowView = ({ fields }) => (
  <table id="singleRowView">
    <SingleRowViewColGroup />
    {fields.map((field) => (
      <tr className="table__row"></tr>
    ))}
  </table>
);

export const SingleRowViewColGroup = () => (
  <colgroup>
    <col className="table__single-view-column--label" />
    <col className="table__single-view-column--data" />
  </colgroup>
);

SingleRowView.defaultProps = {
  fields: [],
};
