import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import {staticChangeLoading} from "../../publicComponents/publicComponents";

export const GeneralView: React.FC<{}> = () => {
    console.log("general-view");
    staticChangeLoading();
    const columns: any[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            sortDirections: ['descend'], //  ['ascend' | 'descend']改变每列可用的排序方式
            sorter: (a, b) => a.name.length - b.name.length,
            onFilter: (value, record) => record.name.indexOf(value) === 0, // 筛选时的方法
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend', // 默认排序
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];

    const data = [];
    for(let i = 0; i < 50; i++) {
        data.push({
            key: i+1,
            name: 'Test ' + (i+1),
            age: 32,
            address: 'London No. 2 Lake Park',
        });
    }
    const paginationProps: any = {
        childrenColumnName: "test分页",
        defaultCurrent: 1,
        defaultPageSize: 1,
        pageSizeOptions: 5
    };
    return <div className="general-view">
        <p>使用hooks实现一个前端URDP - 前端基于react + antd</p>
        <Table columns={columns} dataSource={data}
            // rowSelection={}
            expandable={paginationProps}
            //    summary={pageData => ( // 生成一行总结
            //        <Table.Summary fixed>
            //            <Table.Summary.Row>
            //                <Table.Summary.Cell index={0} colSpan={2}>
            //                    Fix Left
            //                </Table.Summary.Cell>
            //                <Table.Summary.Cell index={2} colSpan={8}>
            //                    Scroll Context
            //                </Table.Summary.Cell>
            //                <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
            //            </Table.Summary.Row>
            //        </Table.Summary>
            //    )}
               sticky // 设置粘性头部和滚动条
        />
        {/*<Pagination total={50} />*/}
    </div>
};