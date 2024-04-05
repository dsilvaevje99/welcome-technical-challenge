<template>
  <div class="notifications-wrapper">
    <div class="notifications-container">
      <div v-for="ntf in store.notifications" :key="ntf.id">
        <v-alert
          :type="ntf.type"
          :title="ntf.title"
          :text="ntf.text"
          :icon="`$${ntf.type}`"
          closable
          @click:close="() => store.removeNotification(ntf.id)"
        ></v-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useNotificationStore();
</script>

<style scoped lang="scss">
.notifications-wrapper {
  z-index: 999999;
  pointer-events: none;
  background: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: auto;
  max-width: 100vw;
  min-width: 20rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .notifications-container {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 100%;
    overflow-y: auto;
    gap: 1rem;
    pointer-events: auto;
    flex-shrink: 0;
  }
}
</style>
