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
    const url = `${apiUrl}/${resource}`;
    const { json } = await httpClient(url);

    return {
      data: json,
      total: json.length,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
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
            id_room: roomId
          }),
        }
      );

      for (const speakerId of speakerIds ?? []) {
        await httpClient(
          `${apiUrl}/events/${eventId}/sessions/${json.id}/speakers/${speakerId}/associate`,
          { method: "PATCH" }
        );
      }

      return { data: json };
    }

    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },
  update: async (resource, params) => {
    if (resource === "sessions") {
      console.log("params.data:", params.data);
      console.log("params.previousData:", params.previousData);
      const { speakerIds, roomId, speakers, room, eventId, ...rest } = params.data;

      const resolvedEventId = eventId ?? params.previousData?.eventId;

      console.log("eventId:", resolvedEventId);

      const { json } = await httpClient(
        `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ ...rest, roomId }),
        }
      );

      const previousSpeakerIds = params.previousData?.speakerIds ?? [];
      const newSpeakerIds = speakerIds ?? [];

      const toAssociate = newSpeakerIds.filter(
        (id: string) => !previousSpeakerIds.includes(id)
      );
      for (const speakerId of toAssociate) {
        await httpClient(
          `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}/speakers/${speakerId}/associate`,
          { method: "PATCH" }
        );
      }

      const toDissociate = previousSpeakerIds.filter(
        (id: string) => !newSpeakerIds.includes(id)
      );
      for (const speakerId of toDissociate) {
        await httpClient(
          `${apiUrl}/events/${resolvedEventId}/sessions/${params.id}/speakers/${speakerId}/dissociate`,
          { method: "PATCH" }
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
      const eventId = params.id;
      const url = `${apiUrl}/events/${eventId}/sessions`;
      const { json } = await httpClient(url);
      return { data: json, total: json.length };
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
