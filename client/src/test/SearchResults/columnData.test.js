import { columnData } from '../../components/SearchResults/ResultTable/columnData';

describe('columnData', () => {
  it('has a property for each column', () => {
    expect(columnData.sources).toBeDefined();
    expect(columnData.entries).toBeDefined();
    expect(columnData.collections).toBeDefined();
  });
});
