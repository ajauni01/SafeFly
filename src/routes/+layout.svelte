<script>
    import {NavBar, Footer} from '$lib/index'
    import {page} from '$app/stores'
</script>

<NavBar/>
{#key $page.url.pathname}
<slot/>
{/key}
<!-- <Footer/> -->