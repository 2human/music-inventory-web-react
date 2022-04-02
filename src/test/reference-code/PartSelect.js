import React from 'react';
import { PartSelect } from '../components/PartSelect/PartSelect';
import { createContainer } from './domManipulators';


describe('PartSelect', () => {
  let render, container, element, elements, click;

  beforeEach(() => {
    ({ render, element, elements, click } = createContainer());
  });  
  
  const data = [
    {partNumber: 'p#1', partName: 'pn1', uom: 'uom1' },
    {partNumber: 'p#2', partName: 'pn2', uom: 'uom2' },
    {partNumber: 'p#3', partName: 'pn3', uom: 'uom3' }
  ];

  const columns = ['col1', 'col2', 'col3'];

  it('renders a part select table', () => {
    render(<PartSelect />);
    expect(element('table#partSelect')).not.toBeNull();
  });

  it('renders a header row', () => {
    render(<PartSelect />);
    
    render(<PartSelect />);
    const header = element('thead');
    expect(header).not.toBeNull();
  });

  it('renders a column header with three columns', () => {
    render(<PartSelect />);
    const headerRow = elements('thead >* th');
    expect(headerRow).toHaveLength(3);
  });

  it('renders column headers corresponding to columns array', () => {
    render(<PartSelect columns={columns}/>);
    const renderedColumns = elements('thead >* th');
    expect(renderedColumns).toHaveLength(columns.length);
    expect(renderedColumns[0].textContent).toEqual(columns[0]);
    expect(renderedColumns[2].textContent).toEqual(columns[2]);
  });

  it('renders a table body', () => {    
    render(<PartSelect />);
    expect(element('tbody')).not.toBeNull();
  });

  it('renders a row for each part', () => {
    render(<PartSelect data={data}/>);
    const dataRows = elements('tbody > tr');
    expect(dataRows).toHaveLength(data.length);
  });  

  it('renders three cells in each data row', () => {
    render(<PartSelect data={data}/>);
    const firstDataRow = elements('tbody > tr:first-child td');
    const lastDataRow = elements('tbody > tr:last-child td');
    expect(firstDataRow).toHaveLength(3);
    expect(lastDataRow).toHaveLength(3);
  });

  it('renders the part number in each row', () => {
    render(<PartSelect data={data}/>);
    const partNumberCells = elements('tbody > tr td:nth-child(1)');
    expect(partNumberCells[0].textContent).toEqual(data[0].partNumber);    
    expect(partNumberCells[2].textContent).toEqual(data[2].partNumber);
  });

  it('renders the part name in each row', () => {
    render(<PartSelect data={data}/>);
    const partNameCells = elements('tbody > tr td:nth-child(2)');
    expect(partNameCells[0].textContent).toEqual(data[0].partName);    
    expect(partNameCells[2].textContent).toEqual(data[2].partName);
  });

  it('renders the UOM in each row', () => {
    render(<PartSelect data={data}/>);
    const uomCells = elements('tbody > tr td:nth-child(3)');
    expect(uomCells[0].textContent).toEqual(data[0].uom);    
    expect(uomCells[2].textContent).toEqual(data[2].uom);
  });

  it('renders a col element for each field', () => {
    render(<PartSelect data={data}/>);
    const colElements = elements('table > colgroup > col');
    expect(colElements).toHaveLength(Object.keys(data[0]).length);
  });

  it('returns the part number when a row is clicked', () =>{
    let clickedPart;
    render(<PartSelect 
            data={data}
            onRowClick={ part => clickedPart = part}
            />);
    const firstDataRow = element('tbody > tr:first-child');
    click(firstDataRow);
    expect(clickedPart).toBeDefined();
    expect(clickedPart.partNumber).toEqual(data[0].partNumber);
    const lastDataRow = element('tbody > tr:last-child');
    click(lastDataRow);
    expect(clickedPart).toBeDefined();
    expect(clickedPart.partNumber).toEqual(data[2].partNumber);
  });

}); 