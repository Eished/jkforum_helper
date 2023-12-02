/* eslint-disable react/jsx-key */
import { GenericObject, RunStatus, Status } from '@/commonType';
import { getTid } from '@/utils/tools';
import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { Button } from '../Button/Button';
import { Toggle } from '../Toggle/Toggle';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };
  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <input className="w-6 mx-1" value={value} onChange={onChange} onBlur={onBlur} />
      分钟/点击
    </div>
  );
};

const ToggleCell = ({
  value,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
  const update = () => {
    updateMyData(index, id, value === Status.online ? Status.offline : Status.online);
  };
  return (
    <Toggle
      mykey={`${id}-${index}-${value}`}
      label={value === Status.online ? '已启用' : '未启用'}
      onClick={update}
      checked={value === Status.online}
    />
  );
};

const LightCell = ({ value }: any) => {
  const getLightColor = (value: RunStatus) => {
    switch (true) {
      case value === RunStatus.Running:
        return 'bg-green-400';
      case value === RunStatus.NotRunning:
        return 'bg-gray-400';
      case value === RunStatus.Error:
        return 'bg-red-400';
      case value === RunStatus.Waiting:
        return 'bg-blue-400';

      default:
        break;
    }
  };
  return (
    <div
      title="状态为‘等待中’时为未到执行时间段，状态为‘错误’时请刷新页面重新运行"
      className={`flex items-center w-16 cursor-help`}>
      <span className={`rounded-md px-2 py-1 font-bold text-white ${getLightColor(value)}`}>{value}</span>
    </div>
  );
};

const DeleteCell = ({
  row: { index },
  deleteData, // This is a custom function that we supplied to our table instance
}: any) => {
  return <Button text={'删除'} onClick={() => deleteData(index)} />;
};

interface TableProps {
  title: string;
  data: GenericObject[];
  updateMyData: (rowIndex: any, columnId: any, value: any) => void;
  deleteData: (id: number) => void;
  searchBar?: boolean;
  skipPageReset?: boolean;
}

export default function ReactTableCard({
  title,
  data,
  updateMyData,
  deleteData,
  skipPageReset = true,
  searchBar = true,
}: TableProps) {
  const colHeader = (headerItem: any) => {
    if (headerItem === 'title') {
      return {
        Header: '标题',
        accessor: headerItem,
        Cell: (props: any) => {
          return (
            <strong title={props.value} className="block whitespace-nowrap overflow-hidden overflow-ellipsis mx-1">
              {props.value}
            </strong>
          );
        },
      };
    } else if (headerItem === 'status') {
      return {
        Header: '启用状态',
        accessor: headerItem,
        Cell: ToggleCell,
      };
    } else if (headerItem === 'runStatus') {
      return {
        Header: '运行状态',
        accessor: headerItem,
        Cell: LightCell,
      };
    } else if (headerItem === 'cycle') {
      return {
        Header: '点击间隔时间',
        accessor: headerItem,
        Cell: EditableCell,
      };
    } else if (headerItem === 'delete') {
      return {
        Header: '操作',
        accessor: headerItem,
        Cell: DeleteCell,
      };
    } else if (headerItem === 'url') {
      return {
        Header: '帖子ID',
        accessor: headerItem,
        Cell: ({ value }: any) => {
          return (
            <a className="border-b" title={value} target="_blank" href={value} rel="noreferrer">
              {getTid(value)}
            </a>
          );
        },
      };
    } else if (headerItem === 'times') {
      return {
        Header: '点击次数',
        accessor: headerItem,
        Cell: ({ value }: any) => {
          return <span>{value + ' 次'}</span>;
        },
      };
    } else if (headerItem === 'nextClickTime') {
      return {
        Header: '下次点击',
        accessor: headerItem,
        Cell: ({ value }: any) => {
          return <span>{new Date(value).toLocaleString()}</span>;
        },
      };
    } else if (headerItem === 'retry') {
      return {
        Header: '重试次数',
        accessor: headerItem,
        Cell: ({ value }: any) => {
          return <span>{value}</span>;
        },
      };
    } else if (headerItem === 'runTime') {
      return {
        Header: '运行时段',
        accessor: headerItem,
        Cell: ({ value }: any) => {
          return <span>{value ? value.startTime + ':00~' + value.endTime + ':59' : '24h'}</span>;
        },
      };
    } else {
      return {
        Header: headerItem,
        accessor: headerItem,
      };
    }
  };

  const memoColumns = useMemo(() => {
    const headers = Object.keys(data[0]).map(colHeader);
    // push columns
    return headers;
  }, [data]);

  const memoData = useMemo(() => data, [data]);

  const memoTitle = useMemo(() => title, [title]);

  const defaultSort = () => {
    const headers = Object.keys(data[0]).map(colHeader);
    return headers.filter((col) => (col.Header === 'name' ? { id: 'total', desc: true } : { id: 'sum', desc: true }));
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      initialState: {
        // sortBy: [defaultSort()],
        pageSize: 20,
      },
      // defaultColumn,
      autoResetPage: !skipPageReset,
      disableSortRemove: true,
      updateMyData,
      deleteData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  return (
    <div>
      <div className="bg-white px-2 py-4">
        <h3 className="text-lg px-2 py-2 leading-6 font-medium text-gray-900">{memoTitle}</h3>
        {searchBar ? (
          <div className="mx-2 flex-1 relative text-gray-500 focus-within:text-gray-400">
            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
                height="25"
                width="25">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              className="pl-5 block shadow-sm border-2 transition text-gray-900 disabled:opacity-25 focus:border-gray-100 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5"
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        ) : (
          ''
        )}
        <table {...getTableProps()} className="mb-4 min-w-full divide-y divide-gray-100 table-auto">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-2 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    <div className="flex">
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            height="16"
                            width="16">
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            height="16"
                            width="16">
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"></path>
                          </svg>
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="w-full divide-y text-left text-sm text-gray-500 " role="table" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-200 bg-white">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-xs p-0 h-8 whitespace-nowrap font-medium text-gray-900 max-w-[150px] overflow-hidden text-ellipsis">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* {pageSize - page.length > 0 && <tr style={{ height: (pageSize - page.length) * 32 }}></tr>} */}
          </tbody>
        </table>
        <div className="flex justify-center bg-gray-100">
          <div className="px-2 text-left text-xs text-gray-500 tracking-wider">
            <button
              className="bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}>
              {'<< 第一页'}
            </button>{' '}
            <button
              className="bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}>
              {'< 上一页'}
            </button>{' '}
            <button
              className="bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded"
              onClick={() => nextPage()}
              disabled={!canNextPage}>
              {'下一页 >'}
            </button>{' '}
            <button
              className="bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              {'最后一页 >>'}
            </button>{' '}
            <span>
              | 第{' '}
              <strong>
                {pageIndex + 1} 页，共 {pageOptions.length} 页
              </strong>{' '}
            </span>
            <span>
              | 跳转到第{' '}
              <input
                className="w-8 bg-gray-100 hover:bg-gray-200"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />{' '}
              页
            </span>{' '}
            <select
              className="bg-gray-100 hover:bg-gray-200 pl-1"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  显示{pageSize}条
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
