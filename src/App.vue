<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
* {
  box-sizing: border-box;
}
.fr {
  display: flex;
  align-items: center;
}
.fc {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.p-r {
  position: relative;
}
.p-a {
  position: absolute;
}
</style>
