<template>
  <section class="contact-page">
    <h2 class="contact-title">Свяжитесь с нами</h2>
    <form class="contact-form" @submit.prevent="submit">
      <input v-model="name" type="text" placeholder="Имя" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <textarea v-model="message" placeholder="Сообщение" required />
      <button type="submit">Отправить</button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const name = ref('')
    const email = ref('')
    const message = ref('')

    const submit = () => {
      alert(`Спасибо, ${name.value}! Мы свяжемся с вами по ${email.value}.`)
      name.value = ''
      email.value = ''
      message.value = ''
    }

    return { name, email, message, submit }
  }
})
</script>

<style scoped lang="scss">
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  text-align: center;
  color: #fff;
  letter-spacing: 1.5px;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #333;
  transition: border 0.2s ease, box-shadow 0.3s ease;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #777;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 8px rgba(0, 170, 255, 0.4);
}

.contact-form textarea {
  resize: vertical;
  min-height: 140px;
}

.contact-form button {
  margin-top: 1rem;
  align-self: center;
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
  font-weight: bold;
  background: linear-gradient(to right, #00aaff, #0077cc);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 170, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.contact-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 170, 255, 0.5);
}
</style>