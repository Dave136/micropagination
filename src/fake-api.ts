const elements = [
  {
    id: "1",
    content: "My first content",
  },
  {
    id: "2",
    content: "My second content",
  },
  {
    id: "3",
    content: "My third content",
  },
  {
    id: "4",
    content: "My fourth content",
  },
  {
    id: "5",
    content: "My fifth content",
  },
  {
    id: "6",
    content: "My sixth content",
  },
];

interface FetcherResult {
  data: any;
  pagination: {
    page: number;
    pageCount: number;
    total: number;
  };
}

export default function fetcher({
  page = 1,
  pageSize = 2,
} = {}): Promise<FetcherResult> {
  return new Promise((res, _rej) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = elements.slice(startIndex, endIndex);
    const pageCount = elements.length / pageSize;
    const total = elements.length;

    setTimeout(() => {
      const response = {
        data,
        pagination: {
          page,
          pageCount,
          total,
        },
      };

      res(response);
    }, 500);
  });
}
