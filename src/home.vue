<template>
  <div id="home">
    <div class="header">
      <div class="user" v-if="userStore.getUserInfo?.id">{{ userStore.getUserInfo?.userName }}</div>
      <div class="user" v-else @click="goToLogin()">登录</div>
    </div>
    <nav
      @click="
        () => {
          router.push({ path: `/demoShow` });
        }
      "
      data-text="Demo"
      class="nav"
    >
      <svg viewBox="0 0 450 200">
        <defs>
          <linearGradient id="exampleGradient" x1="20%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#c9c9ea;stop-opacity:1" />
            <stop offset="15%" style="stop-color:#c9c9ea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#965de6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <text x="0" y="70%"> Demo </text>
      </svg>  
    </nav>
    <div class="content">
      <template v-for="item in demoList" :key="item.name">
        <div class="item" @click="jumpTo(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import loadingHook from './hooks/loadingHook';
import { getDemoList } from '@/api/api';
import { useUserStore } from '@/store/index'

const router = useRouter();
const demoList = ref<any>([]); 
const userStore = useUserStore()

onMounted(() => {
  setTimeout(() => {
    loadingHook.value = false
  }, 4000)
});

const jumpTo = (value: any) => {
  router.push({ path: `/demoDetail`, query: { id: value.id } });
};

onMounted(() => {
  init()
})

const init = async() => {
  const res: any = await getDemoList({});
  if (res.code === 200) {
    demoList.value = res.data
  }
}

const goToLogin = () => {
  loadingHook.value = false
  router.push('/login')
}
</script>
<style scoped lang="scss">
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  height: auto;
  width: 100%;
  .header {
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
    padding: 0 80px;
    box-sizing: border-box;
    .user {
      font-size: 20px;
      font-weight: 700;
      color: #965de6;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        filter: brightness(1.3);
      }
    }
  }

  .nav {
    position: relative;
    width: 450px;
    height: 200px;
    font-weight: 700;
    font-family: math;
    cursor: pointer;
    user-select: none;
    &::before {
      position: absolute;
      top: -22px;
      height: 200px;
      font-size: 158px;
      content: attr(data-text);
      color: transparent;
      background-image: linear-gradient(135deg, #c9c9ea 10%, #965de6 100%);
      background-clip: text;
      -webkit-background-clip: text;
      font-family: math;
      letter-spacing: 4px;
    }
    &:hover {
      &::before {
        opacity: 0;
      }
      svg text {
        opacity: 1;
        animation: stroke 5s infinite alternate;
      }
    }
  }

  .content {
    max-width: 1280px;
    min-width: 755px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 295px);
    grid-row-gap: 40px;
    grid-column-gap: 32px;
    width: 100%;

    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 120px;
      border-radius: 15px;
      background-color: #965de63f;
      transition: all 0.3s;
      font-size: 26px;
      font-family: math;
      font-weight: 700;
      text-transform: capitalize;
      cursor: pointer;
      overflow: hidden;

      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -80px;
        margin: auto;
        transform: rotate(30deg);
        width: 45px;
        height: 260px;
        content: "";
        background-color: #ffffff6c;
      }

      &:hover {
        box-shadow: 0 0 10px 1px #965de6;
        font-size: 30px;

        &::after {
          transition: all 0.5s;
          left: 270px;
        }
      }
    }
  }
}

svg text {
    opacity: 0;
    letter-spacing: 4px;
    font-size: 158px;
}
@keyframes stroke {
    0% {
        fill: rgba(72, 138, 20, 0);
        stroke: url(#exampleGradient);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 1;
    }
    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: url(#exampleGradient);
        stroke-width: 3;
    }
    90%,
    100% {
        fill: url(#exampleGradient);
        stroke: rgba(54, 95, 160, 0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}
</style>
