import { TestBed } from '@angular/core/testing';
import { ICellCompareDto } from './entitites/cell-compare.dto';
import { ICellDto } from './entitites/cell.dto';
import { IInputDto } from './entitites/input.dto';
import { IProductDto } from './entitites/product.dto';
import { TableMode, ICellDefinition } from './interfaces/table-data.interface';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './input-table.datasource';
import { InputTableService } from './services/input-table.service';

import * as mockData from './test/mock-data';
import { take } from 'rxjs/operators';
import { features } from 'process';

describe('Table DataSource', () => {
    let fixture: ProductDataSource;
    let tableService: InputTableService;
    let mode: TableMode;
    let mockInputs: IInputDto[];
    let mockProducts: IProductDto[];
    let mockCells: ICellDto[];
    let mockCompareCells: ICellCompareDto[];
    let config: ITableConfig;

    let lessonBack: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [InputTableService]
        }).compileComponents();

        tableService = TestBed.inject(InputTableService);
    });

    function createFixture() {
        const runTypeId = 1;
        fixture = new ProductDataSource(
            runTypeId,
            mode,
            mockInputs,
            mockProducts,
            mockCells,
            mockCompareCells,
            config,
            tableService
        );
        // lessonBack =fixture.connect();
    }

    describe('General Functionality', () => {
        beforeEach(() => {
            mockInputs = mockData.mockInputs;
            mockProducts = mockData.mockProducts;
            mockCells = mockData.mockCells;
            mockCompareCells = mockData.mockCellCompare;
            mode = TableMode.ReadOnly;
            config = mockData.mockTableConfig;
        });

        describe('Header Table', () => {
            describe('Category Header Functionality', () => {
                beforeEach(() => {
                    createFixture();
                    fixture.load();
                });

                it('Click in Category Header to Hide Column', () => {
                    // ARRANGE

                    // ACT
                    fixture.toggleCategory(27, 'header'); // Hide Column

                    // ASSERT
                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.length).toBe(7);
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeTruthy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeFalsy();
                });

                it('Click in Category Header to Show Column', () => {
                    // ARRANGE

                    // ACT
                    fixture.toggleCategory(27, 'header'); // Hide one Column
                    fixture.toggleCategory(40, 'header'); // Hide other Column

                    // ASSERT
                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.length).toBe(4);
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeTruthy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeTruthy();
                });

                it('Validate if Could hide more of one column', () => {
                    // ARRANGE
                    fixture.toggleCategory(40, 'header'); // Hide Column

                    // ACT
                    fixture.toggleCategory(40, 'header'); // Show Column

                    // ASSERT
                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.length).toBe(19);
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeFalsy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeFalsy();
                });
            });

            describe('Click Hide/Show Category Headers', () => {
                beforeEach(() => {
                    mode = TableMode.Validate;
                    createFixture();
                    fixture.load();
                });

                afterAll(() => {
                    mode = TableMode.ReadOnly;
                });

                it('Hide All Columns', () => {
                    // ARRANGE

                    // ACT
                    fixture.expand('categories');

                    // ASSERT

                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.length).toBe(4);
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeTruthy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeTruthy();
                });

                it('Show All Category Columns', () => {
                    // ARRANGE
                    fixture.expand('categories');
                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeTruthy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeTruthy();

                    // ACT
                    fixture.expand('categories');

                    // ASSERT
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeFalsy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeFalsy();
                });

                it('Show All when you have one category column hide', () => {
                    // ARRANGE
                    fixture.toggleCategory(27, 'header');

                    if (!fixture.tableHeader.displayColumns) {
                        fail();
                    }

                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeTruthy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeFalsy();

                    // ACT
                    fixture.expand('categories');

                    // ASSERT
                    expect(fixture.tableHeader.displayColumns.includes('Unit Linked_empty')).toBeFalsy();
                    expect(fixture.tableHeader.displayColumns.includes('Non Unit Linked_empty')).toBeFalsy();
                });
            });

            describe('Search Functionality', () => {
                beforeEach(() => {
                    createFixture();
                    fixture.load();
                });

                it('filter by input name', async () => {
                    // ARRANGE

                    // ACT
                    fixture.filter('sha');

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(4);
                        expect(data[0].input_category.text).toBe('Assumptions');
                        expect(data[0].input_name.text).toBe('ShareholderReplenishmentSplit');
                        expect(data[1].input_category.text).toBe('Category A');
                        expect(data[1].input_name.text).toBe('ProfitSharePercentage');
                        expect(data[1].input_category.text).toBe('');
                        expect(data[2].input_name.text).toBe('ProfitSharePercentageRider');
                    });
                });
            });
        });

        describe('Content Table', () => {
            describe('Click Category Cell to Hide/Show', () => {
                beforeEach(() => {
                    createFixture();
                    fixture.load();
                });

                it('Hide All', async () => {
                    // ARRANGE

                    // ACT
                    fixture.expand('inputs');

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(4);
                        for (const item of data) {
                            expect(item.input_name.text).toBe('');
                        }
                    });
                });

                it('Show All', async () => {
                    // ARRANGE

                    // ACT
                    fixture.expand('inputs'); // Hide All Categories
                    fixture.expand('inputs'); // Show All Categories

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        for (const item of data) {
                            expect(item.input_name.text).not.toBe('');
                        }
                    });
                });

                it('Show All when you have one category Hide', async () => {
                    // ARRANGE
                    fixture.toggleCategory(73, 'column'); // hide one category.

                    // Validate we hide one category
                    fixture
                        .connect()
                        .pipe(take(1))
                        .subscribe((data) => {
                            expect(data.length).toBe(20);
                            expect(data[0].input_name.text).toBe('');
                        });

                    // ACT
                    fixture.expand('inputs'); // Show All Inputs

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        for (const item of data) {
                            expect(item.input_name.text).not.toBe('');
                        }
                    });
                });
            });

            describe('Click Input Cell', () => {
                beforeEach(() => {
                    mode = TableMode.Edit;
                    createFixture();
                    fixture.load();
                });

                afterAll(() => {
                    mode = TableMode.ReadOnly;
                });

                it('Select Row', async () => {
                    // ARRANGE

                    // ACT
                    fixture.onClickSelectRow(78);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        const item = data.find((x) => x.id === 78);

                        expect(item?.input_name.select).toBeFalsy();
                        for (const key in item) {
                            if (typeof item[key] === 'object' && key !== 'input_category') {
                                expect((item[key] as ICellDefinition).select).toBeTruthy();
                            }
                        }
                    });
                });

                it('unSelect Row', async () => {
                    // ARRANGE
                    fixture.onClickSelectRow(78);

                    // ACT
                    fixture.onClickSelectRow(78);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        const item = data.find((x) => x.id === 78);

                        expect(item?.input_name.select).toBeFalsy();
                        for (const key in item) {
                            if (typeof item[key] === 'object' && key !== 'input_category') {
                                expect((item[key] as ICellDefinition).select).toBeFalsy();
                            }
                        }
                    });
                });

                it('Select Row when you have a previously row selected', async () => {
                    // ARRANGE
                    fixture.onClickSelectRow(78);

                    // ACT
                    fixture.onClickSelectRow(72);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        let item = data.find((x) => x.id === 78);

                        for (const key in item) {
                            if (typeof item[key] === 'object') {
                                expect((item[key] as ICellDefinition).select).toBeFalsy();
                            }
                        }

                        item = data.find((x) => x.id === 72);

                        expect(item?.input_category.select).toBeFalsy();
                        for (const key in item) {
                            if (typeof item[key] === 'object' && key !== 'input_category') {
                                expect((item[key] as ICellDefinition).select).toBeTruthy();
                            }
                        }
                    });
                });

                it('Select Row Selected and click in a cell inside the same row', async () => {
                    // ARRANGE
                    fixture.onClickSelectRow(78);

                    // ACT
                    fixture.onClickCell(78, 29);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        const item = data.find((x) => x.id === 78);

                        expect(item?.input_category.select).toBeFalsy();
                        expect(item?.input_name.select).toBeFalsy();
                        for (const key in item) {
                            if (
                                typeof item[key] === 'object' &&
                                ['input_category', 'input_name', 'DRENRP'].includes(key)
                            ) {
                                expect((item[key] as ICellDefinition).select).toBeTruthy();
                            } else if (key === 'DRENRP') {
                                expect((item['DRENRP'] as ICellDefinition).select).toBeFalsy();
                            }
                        }
                    });
                });

                it('Select Row Selected and click in a cell inside the other row', async () => {
                    // ARRANGE
                    fixture.onClickSelectRow(78);

                    // ACT
                    fixture.onClickCell(72, 29);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(20);
                        let item = data.find((x) => x.id === 78);

                        for (const key in item) {
                            if (typeof item[key] === 'object') {
                                expect((item[key] as ICellDefinition).select).toBeFalsy();
                            }
                        }

                        item = data.find((x) => x.id === 72);

                        expect(item?.input_category.select).toBeFalsy();
                        expect(item?.input_name.select).toBeFalsy();
                        for (const key in item) {
                            if (typeof item[key] === 'object') {
                                expect((item[key] as ICellDefinition).select).toBeFalsy();
                            } else if (key === 'DRENRP') {
                                expect((item['DRENRP'] as ICellDefinition).select).toBeTruthy();
                            }
                        }
                    });
                });
            });

            describe('Lazy Loading Rows', () => {
                beforeEach(() => {
                    createFixture();
                    fixture.load();
                });

                it('execute scroll', async () => {
                    // ARRANGE
                    const e: any = {
                        target: {
                            offsetHeight: 150,
                            scrollHeight: 500,
                            scrollTop: 200
                        }
                    };
                    // ACT
                    fixture.onTableScroll(e);

                    // ASSERT
                    fixture.connect().subscribe((data) => {
                        expect(data.length).toBe(40);
                    });
                });
            });

            describe('Select Cell Icon', () => {
                it('Read Only Icon Click', async () => {
                    // ARRANGE
                    mode = TableMode.ReadOnly;
                    const mockInputId = 12,
                        mockProductId = 32;

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };

                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'readonly');

                    // ASSERT
                    tableService._viewCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                        expect(data?.cell[0].modelParamId).toBe(112);
                    });
                });

                it('Edit Icon Click Simple', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId = 77,
                        mockProductId = 30;

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'edit');

                    // ASSERT
                    tableService._editCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                        expect(data?.cell[0].modelParamId).toBe(112);
                    });
                });

                it('Edit Icon Click Multiple Selections', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 76,
                        mockProductId: number = 28;
                    fixture.onClickCell(mockInputId, 27);
                    fixture.onClickCell(mockInputId, mockProductId);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'edit');

                    // ASSERT
                    tableService._editCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(2);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(27);
                        expect(data?.cell[0].modelParamId).toBe(112);

                        expect(data?.cell[1].inputId).toBe(mockInputId);
                        expect(data?.cell[1].productId).toBe(mockProductId);
                    });
                });

                it('Edit Icon Click Multiple Selections & Select Other Cell', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 76,
                        mockProductId: number = 29;
                    fixture.onClickCell(mockInputId, 27);
                    fixture.onClickCell(mockInputId, 28);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'edit');

                    // ASSERT
                    tableService._editCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(3);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(27);
                        expect(data?.cell[0].modelParamId).toBe(112);

                        expect(data?.cell[1].inputId).toBe(mockInputId);
                        expect(data?.cell[1].productId).toBe(28);

                        expect(data?.cell[2].inputId).toBe(mockInputId);
                        expect(data?.cell[2].productId).toBe(mockProductId);
                    });
                });

                it('Edit Icon Click Multiple Selections & Select Cell in different Row', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 78,
                        mockProductId: number = 29;
                    fixture.onClickCell(76, 27);
                    fixture.onClickCell(76, 28);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'edit');

                    // ASSERT
                    tableService._editCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(1);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                    });
                });

                it('Insert Icon Click Simple', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId = 77,
                        mockProductId = 30;

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'edit');

                    // ASSERT
                    tableService._insertCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                        expect(data?.cell[0].modelParamId).toBe(112);
                    });
                });

                it('Insert Icon Click Multiple Selections', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 71,
                        mockProductId: number = 28;
                    fixture.onClickCell(mockInputId, 27);
                    fixture.onClickCell(mockInputId, mockProductId);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'insert');

                    // ASSERT
                    tableService._insertCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(2);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(27);

                        expect(data?.cell[1].inputId).toBe(mockInputId);
                        expect(data?.cell[1].productId).toBe(mockProductId);
                    });
                });

                it('Insert Icon Click Multiple Selections & Select Other Cell', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 71,
                        mockProductId: number = 29;
                    fixture.onClickCell(mockInputId, 27);
                    fixture.onClickCell(mockInputId, 28);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'insert');

                    // ASSERT
                    tableService._insertCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(3);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(27);

                        expect(data?.cell[1].inputId).toBe(mockInputId);
                        expect(data?.cell[1].productId).toBe(28);

                        expect(data?.cell[2].inputId).toBe(mockInputId);
                        expect(data?.cell[2].productId).toBe(mockProductId);
                    });
                });

                it('Insert Icon Click Multiple Selections & Select Cell in different Row', async () => {
                    // ARRANGE
                    mode = TableMode.Edit;
                    const mockInputId: number = 72,
                        mockProductId: number = 29;
                    fixture.onClickCell(71, 27);
                    fixture.onClickCell(71, 28);

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'insert');

                    // ASSERT
                    tableService._insertCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.cell.length).toBe(1);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                    });
                });

                it('Insert Icon Click Simple', async () => {
                    // ARRANGE
                    mode = TableMode.Validate;
                    const mockInputId = 14,
                        mockProductId = 31;

                    const object = {
                        stopPropagation() {},
                        target: {
                            attributes: {
                                inputId: { value: mockInputId },
                                productId: { value: mockProductId }
                            }
                        }
                    };
                    createFixture();
                    fixture.load();

                    // ACT
                    fixture.onClickCellIcon(object, 'validate');

                    // ASSERT
                    tableService._insertCellSubject$.subscribe((data) => {
                        expect(data?.inputId).toBe(mockInputId);
                        expect(data?.runTypeId).toBe(1);
                        expect(data?.cell[0].inputId).toBe(mockInputId);
                        expect(data?.cell[0].productId).toBe(mockProductId);
                        expect(data?.cell[0].modelParamId).toBe(93);
                    });
                });
            });
        });
    });
});
