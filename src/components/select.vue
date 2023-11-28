<template>
  <select id="select" ref="select" @change="change" v-model="selectVal">
    <option :value="item.value" v-for="(item, i) in props.option" :key="i">
      {{ item.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";

const props = defineProps({
  option: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["update:modelValue"]);

const select = ref<any>();
const selectVal = ref<any>('');

onMounted(() => {
  console.log(select.value?.selectedIndex);
  if (sessionStorage.getItem(`${props.type}Type`)) {
    console.log(111111)
    selectVal.value = sessionStorage.getItem(`${props.type}Type`)
  } else {
    selectVal.value = props.option[0].value
  }
  emit("update:modelValue", selectVal.value);
});

const change = (e: any) => {
  selectVal.value = e.target.value
  sessionStorage.setItem(`${props.type}Type`, selectVal.value)
  emit("update:modelValue", selectVal.value);
};
</script>

<style scoped></style>
