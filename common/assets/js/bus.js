import Vue from 'vue'
const bus = new Vue({
	data () {
		return {
			showDownloadApp: 0,
			downloadAppPos: {
				x: 0,
				y: 0
			}
		}
	},
	method () {

	},
	mounted () {

	}
})
bus.$on('toogleDownloadApp', (val, pos) => {
	bus.showDownloadApp = val
	if (val) {
		bus.showDownloadApp = val
		bus.downloadAppPos = pos
	}
})
export default bus