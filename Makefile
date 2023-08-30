calculate:
	node scripts/data-filters/computeProfitability.mjs

start:
	make calculate
	npm run dev