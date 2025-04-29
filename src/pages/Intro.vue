<template>
  <section class="intro-section">
    <h1 class="intro-title">Введение в аквариумистику</h1>
    <div class="block">
      <img src="https://www.petshop.ru/upload/medialibrary/83d/83d4980402475fe776e5063f56b47514.jpg"
        alt="Аквариум с рыбками" class="block-img" />
      <div class="block-content">
        <p>
          Аквариумистика — это искусство создания и ухода за подводными экосистемами, требующее внимания к деталям и
          понимания биологии водных обитателей.
        </p>
        <p>
          В этом разделе вы узнаете о том, какие факторы влияют на здоровье аквариума: качество воды, параметры
          температуры, уровень освещения и совместимость видов.
          Правильно подобранные условия позволят предотвратить болезни рыб и рост нежелательных водорослей.
        </p>
      </div>
    </div>

    <div class="block reverse">
      <img src="https://astrakhan.angstrem-mebel.ru/upload/medialibrary/962/f8fmq4yp9cqsmrvax4p4rt4gny4f6eia.png"
        alt="Оборудование для аквариума" class="block-img" />
      <div class="block-content">
        <p>
          Качественное оборудование — залог стабильности экосистемы. Мы расскажем о видах фильтров,
          системах подогрева, освещения и аэрации, которые подходят для пресноводных и морских аквариумов.
        </p>
        <p>
          Узнаете об особенностях выбора грунта и декора, их влиянии на биохимию воды, а также о том,
          как правильно устанавливать оборудование, чтобы обеспечить равномерное течение и циркуляцию.
        </p>
      </div>
    </div>

    <div class="block">
      <img src="https://akvatoria.ru/upload/resize_cache/iblock/8f2/1230_758_13df4/8f2757d9a7166db58992d8e94811968b.JPG"
        alt="Запуск аквариума" class="block-img" />
      <div class="block-content">
        <p>
          Аквариумистика — это искусство создания и ухода за подводными экосистемами, требующее внимания к деталям и
          понимания биологии водных обитателей.
        </p>
        <p>
          В этом разделе вы узнаете о том, какие факторы влияют на здоровье аквариума: качество воды, параметры
          температуры, уровень освещения и совместимость видов.
          Правильно подобранные условия позволят предотвратить болезни рыб и рост нежелательных водорослей.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AquariumIntro'
})
</script>

<style scoped>
.intro-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intro-title {
  font-size: 2rem;
  text-align: center;
  color: #222;
}

.block {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.block.reverse {
  flex-direction: row-reverse;
}

.block-img {
  max-width: 45%;
  height: auto;
  border-radius: 8px;
}

.block-content {
  max-width: 55%;
  font-size: 1.2rem;
  line-height: 140%;
}

@media (max-width: 768px) {
  .block {
    flex-direction: column;
  }

  .block.reverse {
    flex-direction: column;
  }

  .block-img,
  .block-content {
    max-width: 100%;
  }
}
</style>
