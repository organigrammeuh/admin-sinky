import {
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  fetchUtils,
  GetManyReferenceParams,
  GetManyReferenceResult,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
} from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };

    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;
    const { json, headers } = await httpClient(url);

    if (!headers.has('content-range')) {
        throw new Error('The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to include this header. Please check the API.');
    }

    return {
        data: json,
        total: parseInt(
            headers.get('content-range')!.split('/').pop()!,
            10
        ),
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },

  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default dataProvider;
