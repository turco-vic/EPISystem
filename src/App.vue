<template>
  <router-view />
  <teleport to="body">
    <div class="toast-container">
      <transition-group name="toast">
        <div v-for="t in toasts" :key="t.id" :class="['toast', `toast-${t.type}`]">
          <i :class="toastIcon(t.type)"></i>
          <span>{{ t.message }}</span>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { ref, provide } from "vue";

export default {
  name: "App",
  setup() {
    const toasts = ref([]);

    function showToast(message, type = "success") {
      const id = Date.now() + Math.random();
      toasts.value.push({ id, message, type });
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id);
      }, 3500);
    }

    function toastIcon(type) {
      if (type === "success") return "fa-solid fa-circle-check";
      if (type === "error") return "fa-solid fa-circle-xmark";
      if (type === "warning") return "fa-solid fa-triangle-exclamation";
      return "fa-solid fa-circle-info";
    }

    provide("showToast", showToast);

    return { toasts, toastIcon };
  }
};
</script>

<style>
.toast-container {
  position: fixed;
  top: calc(10vh + 0.75rem);
  right: 1.75rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.2rem;
  border-radius: 12px;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  min-width: 260px;
  max-width: 380px;
  pointer-events: all;
}

.toast-success {
  background: #1a3a2a;
  color: #86efac;
  border: 1px solid #166534;
}

.toast-error {
  background: #3a1a1a;
  color: #fca5a5;
  border: 1px solid #991b1b;
}

.toast-warning {
  background: #3a2e0a;
  color: #fde68a;
  border: 1px solid #92400e;
}

.toast-info {
  background: #1a2a3a;
  color: #93c5fd;
  border: 1px solid #1e40af;
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.25s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}
</style>