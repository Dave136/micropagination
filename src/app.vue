<template>
  <ul v-if="data && data.length">
    <li v-for="item in data" :key="item.id">
      <p>{{ item.content }}</p>
    </li>
  </ul>
  <hr />
  <VuePaginator
    :current-page="page"
    :per-page="perPage"
    :total="total"
    @change="changePage"
    v-if="total"
  />
</template>

<script setup lang="ts">
import VuePaginator from './micropagination.vue';
import usePagination, { type CallbackParams } from './use-pagination';
import api from './fake-api';
import { unref } from 'vue';

type Data = {
  id: string;
  content: string;
};

const { data, page, total, perPage, changePage } = usePagination<Data>(paginationCallback, {
  perPage: 2,
});

async function paginationCallback(params: CallbackParams) {
  const page = unref(params.page);
  const pageSize = unref(params.perPage);

  const result = await api({ page, pageSize });

  return {
    total: result.pagination.total,
    pageCount: result.pagination.pageCount,
    data: result.data,
  };
}
</script>
