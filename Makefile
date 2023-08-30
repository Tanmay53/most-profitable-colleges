calculate:
	node scripts/data-filters/computeProfitability.mjs

start:
	npm install
	make calculate
	npm run dev
