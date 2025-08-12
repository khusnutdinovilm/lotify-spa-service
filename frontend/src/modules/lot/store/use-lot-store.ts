import { defineStore } from "pinia";
import { ref } from "vue";

import lotService from "modules/lot/service/lot-service";
import { type ICreateLotDto, type ILot, type IUpdateLotDto } from "modules/lot/types/lot";

const useLotStore = defineStore("lot-store", () => {
  const lots = ref<ILot[]>([]);

  const count = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);

  const getLots = async (page = 1) => {
    const res = await lotService.getLots(page);
    const { data: lotList, meta } = res.data;

    lots.value = [...lots.value, ...lotList];

    count.value = meta.total;
    currentPage.value = meta.current_page;
    lastPage.value = meta.last_page;
  };

  const createLot = async (payload: ICreateLotDto) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => formData.append(key, value));

    await lotService.create(formData);
  };

  const updateLot = async (lotId: ILot["id"], payload: IUpdateLotDto) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => formData.append(key, value));

    await lotService.update(lotId, formData);
  };

  const deleteLot = async (lotId: ILot["id"]) => {
    await lotService.delete(lotId);
  };

  return {
    lots,
    count,
    currentPage,
    lastPage,
    getLots,
    createLot,
    updateLot,
    deleteLot,
  };
});

export default useLotStore;
