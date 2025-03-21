'use client'
import DataTable from '@/components/table/data-table';
import React from 'react';
import {investorsData} from '@/constant/data'
import {column} from './column'
import { ColumnDef } from '@tanstack/react-table';

const Data = () => {
  return (
    <DataTable
      data={investorsData}
      columns={column as  ColumnDef<any>[]}
      isLoading={false}
      hasMoreData={false}
      loadMoreData={() => console.log("loadmore")}
    />
  );
};

export default Data;