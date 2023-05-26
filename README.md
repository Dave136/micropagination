# Micropagination
Pagination component and composable to simplify pagination in vue3

### Getting started

You can install using any package manager

```sh
npm install --save micropagination
```

With yarn:
```sh
yarn add micropagination
```

With pnpm:
```sh
pnpm add micropagination
```

Then, you can import the component

```ts
import Micropagination from 'micropagination';
```

And use it in your project:

```javascript
<template>
   <Micropagination @change="changePage" />
</template>

<script lang="ts" setup>
import Micropagination from 'micropagination';

const changePage = (page: number) => console.log('New page: ', page);
</script>
```

## Props
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>currentPage</td>
    <td>string</td>
    <td>false</td>
    <td>1</td>
    <td>Current active page</td>
  </tr>
  <tr>
    <td>perPage</td>
    <td>string</td>
    <td>false</td>
    <td>10</td>
    <td>Items count for one page</td>
  </tr>
  <tr>
    <td>total</td>
    <td>number</td>
    <td>false</td>
    <td>100</td>
    <td>Total count of items</td>
  </tr>
  </tr>
</table>

## Events
<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>change</td>
    <td>Handle click</td>
  </tr>
</table>

Slots:
```javascript
<template>
  <Micropagination
    @change="handleChange"
    currentPage="2"
    perPage="5"
    :total="200"
  >
    <template v-slot:prev-button>
      <div>prev</div>
    </template>
    <template v-slot:next-button>
      <div>next</div>
    </template>
  </Micropagination>
</template>
```

## css default variables
<table>
    <tr>
        <th>Name</th>
        <th>Value</th>
    </tr>
    <tr>
        <th>--primary-color</th>
        <th>#42b984</th>
    </tr>
    <tr>
        <th>--pg-item-width</th>
        <th>40px</th>
    </tr>
    <tr>
        <th>--pg-item-height</th>
        <th>40px</th>
    </tr>
    <tr>
        <th>--pg-item-border-radius</th>
        <th>50%</th>
    </tr>
    <tr>
        <th>--pg-item-distance</th>
        <th>5px</th>
    </tr>
</table>

## Composables

This package also provides a `usePagination` composable to handle the pagination, and here show you how to use it:

```javascript
<template>
  <ul v-if="data && data.length">
    <li v-for="item in data" :key="item.id">
      <p>{{ item.content }}</p>
    </li>
  </ul>
  <hr />
  <Micropagination
    :current-page="page"
    :per-page="perPage"
    :total="total"
    @change="changePage"
    v-if="total"
  />
</template>

<script setup lang="ts">
import Micropagination, { usePagination, type CallbackParams } from "micropagination";
import { unref } from "vue";

type Data = {
  id: string;
  content: string;
};

// Receive a callback and a default params object
const { data, page, total, perPage, changePage } = usePagination<Data>(
  paginationCallback,
  {
    perPage: 5,
  }
);

async function paginationCallback(params: CallbackParams) {
  // unref to avoid the ref wrapper
  const page = unref(params.page);
  const pageSize = unref(params.perPage);

  // get the api result passing the pagination parameters
  const result = await api({ page, pageSize });
   
  // change the reactive variable values
  return {
    total: result.pagination.total,
    pageCount: result.pagination.pageCount,
    data: result.data,
  };
}
</script>

```
## Author

- David Arenas [@dave136](https://twitter.com/davejs4)


### LICENSE
This project is licensed under the [MIT License](LICENSE)
