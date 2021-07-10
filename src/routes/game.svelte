<script lang="ts">
    import { page } from '$app/stores';

    let a
    let b
    page.subscribe((pg) => {
		a = pg.query.get("a")
		b = pg.query.get("b")
	})
</script>

<p>{a}</p>
<p>{b}</p>