<template>hello</template>

<script setup lang="ts"></script>

<style lang="scss">
#app {
  background-color: $slate-900;

  border: 1px solid $slate-700;
  border-radius: $radius-3;

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $space-6;

  & main {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: $space-6;
  }
}
</style>
