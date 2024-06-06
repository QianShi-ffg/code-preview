<template>
  <div class="body-container">
    <div class="container" id="container" :class="containerClass">
      <div>
        <div class="form-container sign-up-container" v-if="type === 'signUp'">
          <form action="#">
            <h1>创建账户</h1>
            <input v-model="name" placeholder="Name" maxlength="16" />
            <input v-model="password" type="password" placeholder="Password" show-password maxlength="16" />
            <div class="btn-grad" @click="signUp">注 册</div>
          </form>
        </div>
        <div class="form-container sign-in-container" v-else>
          <form action="#">
            <h1>LOGIN</h1>
            <input v-model="name" placeholder="Name" maxlength="16" />
            <input v-model="password" type="password" placeholder="Password" show-password maxlength="16" />
            <a href="javascript:void(0);">忘记密码</a>
            <div class="btn-grad" @click="signIn">登 录</div>
          </form>
        </div>
      </div>

      <div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>欢迎回来!</h1>
              <p>让我们接着上次开始吧</p>
              <div class="btn-grad" id="signIn" @click="switchType('signIn')">登 录</div>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>你好，伙计!</h1>
              <p>接下来一起开始新的冒险吧</p>
              <div class="btn-grad" id="signUp" @click="switchType('signUp')">注 册</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import loadingHook from '@/hooks/loadingHook';
import { login } from '@/api/api';
import { useUserStore } from '@/store/index'
// import { ElMessage } from 'element-plus'
// import api from '@/api/index.js'

const name = ref('');
const password = ref('');
const type = ref('signIn');
const containerClass = ref('');
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  setTimeout(() => {
    loadingHook.value = false
  }, 1500)
});

const switchType = (value) => {
  type.value = value
  name.value = ''
  password.value = ''
  if (value === 'signUp') {
    containerClass.value = 'right-panel-active'
  } else {
    containerClass.value = ''
  }
}

const signUp = async() => {
  const res = await api.signUp({name: name.value, password: password.value})
  if (res.code === 200) {
    if (res.data) {
      type.value = 'signIn'
      containerClass.value = ''
      // ElMessage({ message: res.message, type: 'success'})
    } else {
      // ElMessage({ message: res.message, type: 'error'})
    }
  } else {
    // ElMessage({ message: res.message, type: 'error'}) 
  }
}
const signIn = async() => {
  if (name.value !== '' && password.value !== '') {
    const res = await login({userName: name.value, passWord: password.value})
    if (res.code === 200) {
      console.log(res.data)
      userStore.setUserInfo(res.data)
      alert('登录成功')
      router.push('/')
      // sessionStorage.setItem('access_token', res['access_token'])
      // location.reload()
    } else {
      // ElMessage({ message: '账户名密码错误', type: 'error'})
      alert('账户名密码错误')
    }
  } else {
    // ElMessage({ message: '账号与密码不可为空', type: 'error'})
    alert('账号与密码不可为空')
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
  margin: 0;
  margin-bottom: 2rem;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 5px 0;
}

.btn-grad {
  background-image: linear-gradient(to right,
      #6441a5 0%,
      #382547 51%,
      #6441a5 100%);
}

.btn-grad {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 30px;
  display: block;
  cursor: pointer;
  user-select: none;
}

.btn-grad:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

#signIn {
  background-image: linear-gradient(to right, #fff 0%, #f7f3f3 51%, #fff 100%);
  color: #6441a5;
}

#signUp {
  background-image: linear-gradient(to right, #fff 0%, #f7f3f3 51%, #fff 100%);
  color: #6441a5;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  user-select: none;
}

  input {
    border: 1px solid #2a0845;
    background-color: #eee;
    border: none;
    padding: 0 20px;
    margin: 10px 0;
    width: 75%;
    height: 34px;
    border-radius: 20px;
    transition: all 0.5s;
    &:focus {
      transform: scale(1.1);
      outline-offset: unset;
    }
    &:focus-visible {
      outline: unset;
    }
  }

/*  */
.body-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #4568dc;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #c9c9ea, #a3b3e7);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #c9c9ea, #a3b3e7);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.container {
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

/*  */

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  user-select: none;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #6441a5;
  background: -webkit-linear-gradient(to right, #6441a5, #3e2e4b);
  background: linear-gradient(to right, #6441a5, #3e2e4b);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
