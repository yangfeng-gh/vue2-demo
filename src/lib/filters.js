import Vue from 'vue'
import { currency, round } from './util'

Vue.filter('currency', currency)
Vue.filter('round', round)
