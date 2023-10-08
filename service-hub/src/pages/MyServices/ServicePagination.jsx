import React from 'react';
import { Pagination } from '@mui/material';

function ServicePagination({ count, page, onChange, classes }) {
  return (
    <div className={classes.paginationContainer}>
      <Pagination count={count} page={page} onChange={onChange} />
    </div>
  );
}

export default ServicePagination;
