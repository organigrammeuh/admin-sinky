import {
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  fetchUtils,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
} from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${apiUrl}/upload`, {
    method: "POST",
    body: formData,
  });
  const { url } = await res.json();
  return url;
};

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

    if (!headers.has("content-range")) {
      throw new Error(
        "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to include this header. Please check the API.",
      );
    }

    return {
      data: json.map((item: any) => {
        if (resource === "speakers" && item.profilePicture) {
          return { ...item, profilePicture: { src: item.profilePicture } };
        }
        return item;
      }),
      total: parseInt(headers.get("content-range")!.split("/").pop()!, 10),
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    if (resource === "speakers" && json.profilePicture) {
      json.profilePicture = { src: json.profilePicture };
    }
    if (resource === "sessions") {
      console.log("avant transform:", json.room, json.speakers);
      json.roomId = json.room?.id;
      json.speakerIds = json.speakers?.map((s: any) => s.id);
      console.log("après transform:", json.roomId, json.speakerIds);
    }
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  create: async (resource, params) => {
    if (resource === "sessions") {
      console.log("params.data:", params.data);
      const { eventId, speakerIds, roomId, ...rest } = params.data;

      console.log("create session eventId:", eventId);

      const { json } = await httpClient(
        `${apiUrl}/events/${eventId}/sessions`,
        {
          method: "POST",
          body: JSON.stringify({
            ...rest,
            id_room: roomId,
          }),
        },
      );

      for (const speakerId of speakerIds ?? []) {
        await httpClient(
          `${apiUrl}/events/${eventId}/sessions/${json.id}/speakers/${speakerId}/associate`,
          { method: "PATCH" },
        );
      }

      return { data: json };
    }

    if (params.data.profilePicture?.rawFile) {
      params.data.profilePicture = await uploadImage(
        params.data.profilePicture.rawFile,
      );
    } else if (params.data.profilePicture?.src) {
      params.data.profilePicture = params.data.profilePicture.src;
    }

    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },
  update: async (resource, params) => {
    if (resource === "speakers") {
      const data = { ...params.data };
      if (data.profilePicture?.rawFile) {
        data.profilePicture = await uploadImage(data.profilePicture.rawFile);
      } else if (data.profilePicture?.src) {
        data.profilePicture = data.profilePicture.src;
      }
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return { data: json };
    }
    if (resource === "sessions") {
      console.log("params.data:", params.data);
      console.log("params.previousData:", params.previousData);
      const { speakerIds, roomId, speakers, room, eventId, ...rest } =
        params.data;

      const resolvedEventId = eventId ?? params.previousData?.eventId;

      console.log("eventId:", resolvedEventId);

      const { json } = await httpClient(
        `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ ...rest, roomId }),
        },
      );

      const previousSpeakerIds = params.previousData?.speakerIds ?? [];
      const newSpeakerIds = speakerIds ?? [];

      const toAssociate = newSpeakerIds.filter(
        (id: string) => !previousSpeakerIds.includes(id),
      );
      for (const speakerId of toAssociate) {
        await httpClient(
          `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}/speakers/${speakerId}/associate`,
          { method: "PATCH" },
        );
      }

      const toDissociate = previousSpeakerIds.filter(
        (id: string) => !newSpeakerIds.includes(id),
      );
      for (const speakerId of toDissociate) {
        await httpClient(
          `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}/speakers/${speakerId}/dissociate`,
          { method: "PATCH" },
        );
      }

      return { data: { ...json, speakerIds: newSpeakerIds, roomId } };
    }

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

  getManyReference: async (resource, params) => {
    if (resource === "sessions") {
      if (params.target === "eventId") {
        const eventId = params.id;
        const url = `${apiUrl}/events/${eventId}/sessions`;
        const { json } = await httpClient(url);
        return { data: json, total: json.length };
      }

      if (params.target === "roomId") {
        const roomId = params.id;
        const url = `${apiUrl}/sessions`;
        const { json } = await httpClient(url);
        const filtered = json.filter(
          (session: any) => session.room?.id === roomId
        );
        return { data: filtered, total: filtered.length };
      }
if (params.target === "speakerId") {
    const speakerId = params.id;
    const url = `${apiUrl}/sessions`;
    const { json } = await httpClient(url);
    const filtered = json.filter(
        (session: any) =>
            session.speakers?.some((s: any) => s.id === speakerId)
    );
    return { data: filtered, total: filtered.length };
}
      throw new Error(`Unsupported target ${params.target} for sessions`);
    }

    throw new Error("getManyReference not implemented for " + resource);
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
