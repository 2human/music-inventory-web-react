import React from 'react';

export const SingleRowView = ({ fields, data }) => (
  <SingleRowViewContainer>
    <SingleRowViewTableContainer>
      <SingleRowViewColGroup />

      <SingleRowViewTBodyContainer>
        {fields.map((field) => (
          <SingleRowViewRowContainer key={field.name}>
            <SingleRowViewLabelCell text={field.label} />
            <SingleRowViewDataCell data={data[field.name]} />
          </SingleRowViewRowContainer>
        ))}
      </SingleRowViewTBodyContainer>
    </SingleRowViewTableContainer>
  </SingleRowViewContainer>
);

export const SingleRowViewContainer = ({ children }) => (
  <div
    id="singleRowView"
    className="u-padding-top-tiny u-padding-bottom-tiny">
    {children}
  </div>
);

export const SingleRowViewTableContainer = ({ children }) => (
  <table className="table table--single-view">{children}</table>
);

export const SingleRowViewColGroup = () => (
  <colgroup>
    <col className="table__single-view-column--label" />
    <col className="table__single-view-column--data" />
  </colgroup>
);

const SingleRowViewTBodyContainer = ({ children }) => (
  <tbody>{children}</tbody>
);

const SingleRowViewRowContainer = ({ children }) => (
  <tr className="table__row">{children}</tr>
);

const SingleRowViewLabelCell = ({ text }) => (
  <td className="table__data">{text}</td>
);

const SingleRowViewDataCell = ({ data }) => (
  <td className="table__data">{data}</td>
);

SingleRowView.defaultProps = {
  fields: [],
  data: {},
};
