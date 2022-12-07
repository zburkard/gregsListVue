<!-- <template>
  <div class="card text-center elevation-2 selectable" @click="goTo">
    <img class="img-fluid rounded square-bottom" :src="house.imgUrl" alt="">
    <h5>Bedrooms: {{ house.bedrooms }} | Bathrooms: {{ house.bathrooms }} | Built: {{ house.year }}</h5>
    <h5>${{ house.price }}</h5>
    <button v-if="(house.creatorId == account.id)" class="btn btn-danger delete-btn rounded-pill"><i
        class="  px-2 mdi mdi-delete-forever"></i></button>
    <div v-if="house.creator" class="creator text-end p-1">
      <img :src="house.creator.picture" alt="">
      <span>{{ house.creator.name }}</span>
    </div>
  </div>
</template> -->
<template>
  <div class="cols" @click="goTo">
    <div class="col" ontouchstart="this.classList.toggle('hover');">
      <div class="container">
        <div class="front" :style="`background-image: url(${house.imgUrl})`">
          <div class="inner">
            <p>Bedrooms: {{ house.bedrooms }}</p>
            <p>Bathrooms: {{ house.bathrooms }}</p>
          </div>
        </div>
        <div class="back">
          <div class="inner">
            <span>{{ house.description }}</span>
            <p>Levels: {{ house.levels }}</p>
            <p>${{ house.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import { useRouter } from "vue-router";
import { housesService } from "../services/HousesService.js";
export default {
  props: { house: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      async removeCar() {
        // note with props the id here is unused
        try {
          // NOTE you can pass the id from the template OR
          // await carsService.removeCar(id)
          // NOTE you can pull it from props
          await housesService.removeHouse(props.house.id)
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      },
      goTo() {
        logger.log('pushing')
        router.push({ name: 'HouseDetails', params: { id: props.house.id } })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

h1 {
  font-size: 2.5rem;
  font-family: 'Montserrat';
  font-weight: normal;
  color: #444;
  text-align: center;
  margin: 2rem 0;
}



.wrapper {
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
}

.cols {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.col {
  width: calc(25% - 2rem);
  margin: 1rem;
  cursor: pointer;
}

.container {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

.front,
.back {
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-position: center;
  -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  min-height: 280px;
  height: auto;
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
}

.back {
  background: #cedce7;
  background: -webkit-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
}

.front:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  content: '';
  display: block;
  opacity: .6;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
}

.container:hover .front,
.container:hover .back {
  -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.inner {
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
}

.container .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container .front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .back {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .front {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front .inner p {
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.front .inner p:after {
  content: '';
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #C6D4DF;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -.75rem;
}

.front .inner span {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Montserrat';
  font-weight: 300;
}

@media screen and (max-width: 64rem) {
  .col {
    width: calc(33.333333% - 2rem);
  }
}

@media screen and (max-width: 48rem) {
  .col {
    width: calc(50% - 2rem);
  }
}

@media screen and (max-width: 32rem) {
  .col {
    width: 100%;
    margin: 0 0 2rem 0;
  }
}
</style>