Link al corso https://app.pluralsight.com/library/courses/angular-routing
https://blogs.msmvps.com/deborahk/angular-routing-problem-solver/
https://github.com/DeborahK/Angular-Routing

Introduzione
	Angular gestisce
		-le rotte primarie (primary routes)
		-le rotte figlie (child routes)
		-le rotte secondarie (secondary routes)
		-pre caricamento dei dati
		-parametri di una rotta
		-animazione
		-lazy loading e guardie delle rotte 
	Lazy loading delle rotte e relativi componenti 
	Step che avvengono durante il routing di angular
		ad un link della pagina e' associata la direttiva [routerLink] che come valore ha la rotta richiesta sul click
		il click comporta al cambiamento dell'Url del browser (aka serializzazoine valore di [routerLink] nell'Url del browser)
		al cambiamento del link viene ricercata la configurazione angular che corrisponde alla rotta richiesta
		viene trovato il componente configurato x essere caricato sulla navigazione della rotta richiesta
			al posto del componente puo' essere configurato un redirect
			nel momento di navigazione vengono verificati cosi detti process guards, x assicurarsi che la navigazione verso la nuova rotta e' consentita
			se ok, vengono pre caricati i dati, se richiesti dalla configurazione della rotta
			il processo continua attivando tutti i componenti relativi alla nuova rotta
			i componenti sono caricati in direttive router-outlet
			il routing si ferma entro una nuova navigazione
		angular carica il template del componente nel primary outlet (direttiva router-outlet)
		NOTA: qualsiasi cambiamento nella barra di indirizzo del browser comporta all'innesco del meccanismo di routing (es. cambimento dal codice, manuale o sul click su un elemento che contiene [routerLink]
Basi di routing
	i primi passi da fare in configurazione di routing
		1. definire base path
			NOTA: viene considerato in tutte le richieste del browser (es. caricamento risorse statiche)
			viene impostato all'inizio di index.html (<base href="/">)
			NOTA: il base path e' la cartella (root folder) della nostra app sul web server (in sviluppo ok /, ma in produzione puo' essere /mywebapp/)
			e' possibile usare Angular CLI x cambiare il basePath in base all'ambiente target
				es. ng build --base-href /APM/
		2. importare il modulo router di angular
		3. configurare le rotte in modo da specificare i path e i componenti da caricare
		4. identificare dove caricare i componenti
		5. attivare le rotte in base alle azioni degli utenti 
		NOTA: quando si usa il selector nei metadati di un componente, il componente viene caricato nella pagina senza coinvolgere il meccanismo di routing!
	importazione routing di angular
		nel momento di configurazione di routing sono usati seguenti direttive 
			RouterLink
			RouterLinkActive (x associare lo stile alla rotta corrente)
			RouterOutlet (x definire la posizione in cui caricare il componente)
		x usare il routing dobbiamo importare il modulo di angular che contiene la sua implementazione
		RouterModule prevede 2 metodi
			forRoot(), usato solo una volta x tutta l'app, di solito nel modulo principale (es. app.module.ts)
			forChild(), usato x ogni funzionalita' che carica un componente
	configurazione rotte
		NOTA: in un router-outlet puo' essere caricato il template di un solo componente alla volta
			  quando angular ha individuato la configurazione in base all'azienda dell'utente, viene creata l'istanza del componente e il suo template viene caricato nella direttiva router-outlet 
			  configurata
		path='', il path vuoto viene configurato x avere il default associato al path base
		path='**', x configurare il default di una rotta non trovata
		NOTA: il path e' case sensitive
		il componente nella configurazione e' il riferimento alla classe del componente, quindi dobbiamo fare import 
		ordine CONTA, il primo match ritorna la configurazione della rotta, quindi specifichiamo le rotte piu' specifiche all'inizio
		redirect, possiamo usare anche nel momento di refactoring delle rotte (es. renaming), lasciamo la rotta vecchia configurando il redirect alla rotta nuova 
			NOTA: redirect non e' chained, cioe', viene fatto solo un redirect! 
			redirect puo' essere
				local - viene sostituito singolo segmento dell'Url
					    redirect sono locali finche' non mettiamo / nel parametro redirectTo (come primo carattere della nuova rotta)
				absolute - sostituisce intero Url
		NOTA: su una pagina possiamo definire piu' router-outlet (es. un router-outlet x ogni router-link)
	posizionamento del template
		differenza tra la navigazione HTML5 e navigazione hash #
			stile di HTML5	../welcome (browser che non supportano HTML5, sul cambiamento dell'Url, inviano una richiesta al server
				dobbiamo configurare Url rewriting lato web server (consultare le specifiche del web server utlizzato)
				url rewriting serve per indirizzare tutte le richieste che arrivano al server alla pagina index.html (ricordiamo che abbiamo solo una pagina HTML in Angular)
				non avendo # (vedi sotto), il browser se ne accorge sul cambiemento dell'Url, per non inviare una richiesta al web server, dobbiamo configurare Url Rewriting
			stile hash-based ../#/welcome
				non e' richiesto di configurare Url rewriting, il browser ignora le modifiche dell'url al segmento dopo simbolo #
				x usare questa modalita', nella configurazione di rotte dobbiamo specificare { useHash: true }
		NOTA: angular universal - possibilita' di eseguire il rendering server-side
Routing delle funzionalita'
	e' possibile caricare le rotte di una funzionalita' in modalita' lazy
	regole x dare i nomi alle rotte
		es. 
			da evitare: products (the list), product/:id (visualizzare un prodotto), productEdit/:id (editing di un prodotto)
			da preferire (x ragruppare e usare lazy loading delle rotte di funzionalita'): products, products/:id, products/:id/edit
	attivazione rotta usando il codice
		si usa la classe Router iniettabile nel costruttore del componente
		this.router.navigate(['/home']), url specificato e' un url relativo al corrente indirizzo nella barra di navigazione del browser
		al metodo navigate() possiamo passare tutto quello che accetta anche la direttiva routerLink
		invece il metodo navigateByUrl('url') viene usato per eseguire una navigazione su un url assoluto
		usando le parentesi tonde (), possiamo specificare una seconda rotta 
	accedere alle rotte delle funzionalita'
		NOTA: l'ordine con quale angular importa le configurazioni delle rotte e' il seguente - nel modulo root viene definitvo RouterModule.forRoot(), se e' stato definito qualche altro modulo
			nel modulo root (es. moduli delle funzionalita'), prima vengono importati le rotte dei moduli delle funzionalita', importando le rotte del modulo root all'ultimo
		possiamo definire i moduli dedicati alle configurazioni delle rotte
	definizione moduli delle rotte
		definire moduli dedicati alle rotta aiuta a
			organizzare meglio il codice
			facile da trovare le configurazioni necessarie
		NOTA: il modulo in cui definiamo le rotte deve essere importato x ultimo, x rispettare l'ordine di inserimento delle rotte 
		il modulo in cui sono state definite le rotte DEVE esportare RouterModule che consente agli altri moduli definiti nella classe applicativa (quella che importa il modulo delle rotte), di poter
		accedere alle rotte configurate.
Parametri delle rotte
	i parametri sono passati configurando i placeholder necessari
	vari parti di un Url sono chiamati segmenti, anche placeholder
		ci sono segmenti costanti e quelli variabili (es. placeholder)
		es. rotte /orders/:orderId/products/:productId
				  /orders/:id/items/:itemId
		nella demo, per inserimento di un nuovo prodotto, e' stato usato l'url di editing passando lo 0 nel placeholder :id
		NOTA: angular implementa una otimizzazione nel caso il cambiamento dell'url non comporta al caricamento di un nuovo componente, non viene istanziato stesso componente di pima ma vengono
				aggiornati soltanto i dati
	lettura dei parametri
		viene usato ActivatedRoute Service, iniettato usando il costruttore
		possiamo leggere i parati usando
			- snapshot, this.route.snapshot.paramMap.get('id')
				da usare solo se dobbiamo leggere il valore iniziale che non cambia piu', lettura nel metodo OnInit()
			- observables, this.route.paramMap.subscribe(params => { ... params.get('id')... })
				da usare se il parametro cambiamo nel corso del tempo (es. durante la navigazione)
		x leggere il cambiamento di un segmento dinamico usiamo observables (observables forinsce uno stream di eventi nel corso del tempo, eventi che riguardano un cambiamento)
	definire parametri opzionali
		usati x passare dei dati complessi durante la navigazione
		non dobbiamo definire nessuna configurazione aggiuntiva lato routing
		e' sufficiente passare un oggetto {} contenente chiave:valore per ogni singolo parametro da passare
		lo scope del parametro opzionale e' legato al segmento dell'Url, quindi nessuna collisione con altri segmenti
		sono eliminati nel momento di navigazione verso un nuovo Url
		la lettura di parametri opzionali avviene o con snapshot o usando observables (vedi prima)
	parametri query
		i parametri usati x passare informazioni tra piu' rotte (es. dalla lista filtrata al dettaglio e indietro)
		i valori mantenuti tra diverse navigazioni
		come abbiamo gia' visto x parametri opzionali, anche i parametri query non richiedono una configurazione aggiuntiva di routing e NON hanno nessun valore nel momento di decisione di routing
		viene usata la direttiva [queryParams] x passare i parametri in un oggetto
		se usiamo la navigazione da codice, passiamo l'oggetto { queryParams: {...} } come secondo parametro del metodo navigate()
		da tenere presente che query params sono condivisi con piu' rotte, prestare attenzione ai nomi x evitare le colisioni
		NOTA: di default le query params sono risettati durante ogni nuova navigazione, per preservare questi parametri dobbiamo usare la direttiva queryParamsHandling="preserve/merge"
			e tale direttiva va usata nel punto dove avviene una nuova navigazione (es. pulsante Back che ci riporta alla lista filtrata precedentemente)
		NOTA: se si ritorna alla lista filtrata preservando le query params, per far si che la lista recupera i filtri specificati nella QueryString, dobbiamo leggere questi parametri
	lettura di query params
		simile alla lettura di parametri obbligatori/facoltativi visti prima 
		usiamo snapshot/observables sulla mappa queryParamMap
		la lettura puo' avvenire nel metodo OnInit()
	NOTA: parametri opzionali vanno sempre specificati dopo i parametri obbligatori 
Prefetching dei dati usando i resolvers
	recupero dei dati prima di eseguire il routing verso il componente, il template del quale richiede dei dati
	vengono usati cosi detti router resolvers 
	il precaricamenti dei dati aiuta a migliorare il riutilizzo di codice e a non mostrare delle pagine prazialmente popolate
	ci sono diversi metodi x fornire i dati per una rotta
		route params obbligatori
		route params facoltativi
		query params
		route's data property
			viene definito l'attributo data nella configurazione della rotta, e' un oggeto con N key:value pairs
		route resolvers
		angular services
	cosa dobbiamo fare x usare un route resolver
		- costruire route resolver service (recupera i dati necessari al nostro componente)
		- aggiungere il resolver nella configurazione delle rotte
	Route resolver implementa l'interfaccia Resolve<>
		implementiamo il metodo resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {  }
	uno dei vantaggi di usare i resolver e' la gestione degli errori
		se ritorniamo false dal resolve(), la navigazione viene cancellata
		possiamo ritornare null, es. il prodotto non e' stato trovato
		oppure possiamo navigare alla pagina dell'errore 
		come passare l'errore al chiamante?
			- usare un servizio
			- usare parametri opzionali
			- gestore degli errori custom
			- passare in una proprieta' di resolved data 
	lettura dei dati passati tra i componenti
		iniettiamo nel costruttore ActivatedRoute e leggiamo tutto quello che c'e', collection data[]
		usiamo subscribe() su resource.RouteData, x poter intercettare le modifiche all'Url
Rotte figlie (child routes)
	possiamo definire una gerarchia di rotte per migliorare l'organizzazione, incapsulamento e navigazione della nostra app
	e' possibile eseguire un caricamento lazy delle rotte
	es. gerarchia 
		primary routes: /products -> /:id/edit 
		child routes di /products/:id/edit: -> /info (e editare le info di un prodotto) e /tags (x editare i tag di un prodotto)
	configurazione rotte figlie
		la configurazione avviene nel modulo, dove per ogni rotta primaria possiamo definire un una collection 'children'
		x ogni figlio specifichiamo il path relativo e il componente da carica 
		ricordiamoci di aggiungere i componenti anche nel parametro declarations della direttiva @NgModule
	visualizzazione della view figlia
		nella pagina dove vogliamo visualizzare le view delle rotte figlie, usiamo il solito attributo [router-link] e direttiva <router-outlet />
	attivazione delle rotte figlie
		e' possibile usare sia il path assoluto che relativo
		NOTA: se il link e' relativo, non mettiamo / davanti
	x recuperare i dati per la view figlia, come e' stato specificato anche prima, ci sono due strade
		1. usare il servizio e metodo subscribe
		2. usare il resolver della rotta figlia (child route resolver) o quello della rotta padre
			es. this.route.snapshot.data['product']
				this.route.parent.snapshot.data['product']
		se abbiamo un'altro link che carica lo stesso componente, dobbiamo resettare il contenuto della form chiamando il metodo reset() nel ngOnInit()
	validazione attraverso le rotte figlie (es. come disabilitare il pulsante del padre se un campo del figlio non e' valido)
		valutiamo diverse strade:
			1. spostiamo elemento <form> nel padre
				NON funziona con angular, elemento <form> non riconosce lo stato di componenti caricati nel router-outlet interno
			2. definire <form> all'interno di componenti figlia
				NON funziona, e' quello che abbiamo visto prima
			3. definire tutti i componenti figli in uno unico componente
				funzionerebbe, ma e' una soluzione piu' difficile da manutenere (es. tab multipli)
			4. definire elementi <form> nei componenti figlie ma eseguire una validazione manuale, senza le funzionalita' della form
		abbiamo definito un validatore custom a livello del padre (dove abbiamo accesso a tutti dati) e disabilitiamo un pulsante se la validazione x qualche motivo fallisce.
		validiamo i dati presenti in memoria lato browser, aggiornati ogni qualvolta vengono modificati dall'utente
Raggruppamento e rotte senza componenti
	raggruppamento serve x organizzare meglio la nostra app, condividere i resolver e guards, caricare le rotte di un area di funzionalita' in modalita' lazy
	le rotte vengono raggruppate sotto una rotta senza componenti
	spostiamo le rotte di prodotti sotto la rotta padre che prevede il caricamento della lista di prodotti
	creiamo rotta di default (es '') mappandola nel nostro componente padre -> alla fine il padre rimane senza componenti, ed e' questa impostazione che fa funzionare' il giro
Applicare gli stili, animazione e watching delle rotte
	applicare lo stile alla rotta selezionata
		si puo' aggiungere i stili x indicare la rotta corrente
		si usa la direttiva routerLinkActive, associando una classe (es. routerLinkActive="active")
		possiamo aggiungere anche delle icone (es. stili di fant-awesome) sui tab che contengono i dati non validi, si usa la direttiva [ngClass]
		la direttiva  [routerLinkActiveOptions]="{ exact: true }" viene usata per poter applicare lo stile solo se il path matching e' esattamente quello della rotta
	aggiungere animazione al cambiamento della rotta
		x applicare l'animazione dobbiamo seguire i seguenti 4 passi
			1. importare BrowserAnimationsModule, x poter accedere alle direttive di animazione
			2. definire animazione desiderata
			3. registrare l'animazione x componente
			4. trigherare animazione quando router-outlet viene attivato
		l'animazione prevede una sua sintassi x poter eseguire una appropriata configurazione, fare riferimento al sito di angular
		la direttiva da usare nel contenuto di <router-outlet> e'  [@slideInAnimation], alla quale puo' essere passata un'espressione del genere "o.isActivated ? o.activatedRoute : ''"
			avendo <router-outlet #o="outlet"></router-outlet>
	'ascoltare' eventi di routing
		quando avviene la navigazione nella nostra app, vengono generati degli eventi x poter agganciare una logica custom
		eventi sollevati sono
			- NavigationStart
			- RoutesRecognized
			- NavigationEnd
			- NavigationCancel
			- NavigationError
		possiamo vedere questi eventi se abiliamo il tracing nel posto di configurazione delle rotte 
			una volta abilitato il tracing vediamo il dettaglio di eventi nella console del browser
	reagire agli eventi di routing
		possiamo aggiungere la logica di visualizzazione spinner (es. farlo partire nel NavigationStart e fermarlo nel NavigationEnd), logging azione eseguita, eseguire della logica custom 
		x registrarsi ad un evento eseguiamo subscribe sugli eventi della rotta (es. this.route.events.subscribe(...)
		per esembio nel costruttore dove viene iniettato il route 
		e' consigliato creare di resolver che caricano i dati per una nostra view, in questo modo spinner puo' partire prima che viene eseguito il passaggio alla view, e termina una volta i dati
			sono stati caricati e a view sta per essere visualizzata
Rotte secondarie
	facilitano la visualizzazione di pannelli multipli sulla pagina, con proprio contenuto e propria navigazione
	le rotte secondarie possano avere le proprie rotte figlie, i propri parametri di routing, e le proprie rotte secondarie
	x distinguere le rotte secondarie da quelle primarie, diamo il nome al router-outlet della rotta secondaria
	possiamo definire >1 secondary outlet allo stesso livello di gerarchia, importante che abbiamo un nome univoco
	nella configurazione della rotta secondaria specifichiamo il parametro outlet x impostare il contenitore router-outlet in cui vogliamo disegnare il componente
	quando navighiamo la rotta secondaria, il campo contenente l'indirizzo nel browser riporta sia la rotta primaria che quella secondaria
		la rotta secondaria viene racchiusa tra ()
	attivazione rotta secondaria
		es. [routerLink]="[{ outlets: { popup: ['messages'] }}]", dove popup e' il nome di outlet in cui disegnare il componente configurato e associato al path 'messages'
		le rotte secondarie possano essere attivate dal codice javascript
			si usa il modulo router e metodo navigate
		possiamo eseguire la navigazione multipla, cambiando la rotta principale e quella secondaria.
		si puo' attivare la navigazione costruendo url dal codice, il metodo da chiamare e' this.router.navigateByUrl('...url contenente anche una rotta secondaria...')
			(NON e' consigliato cmq questo approccio, meglio usare sempre il metodo navigate())
	eliminazione rotte secondarie
		e' sufficiente chiamare metodo navigate passando il valore null nel outlet della rotta secondaria
		es.  this.router.navigate([ { outlets: { popup: null }}]);
Guardiani delle rotte (Router guards)
	servono x controllare
		- autorizzazione di accesso alle rotte
		- sicurezza 
		- monitoring
	o, x chiedere all'utente una conferma prima di lasciare la rotta
	route guards previsti in angular:
		- canActivate
		- canActivateChild (x controllare la navigazione verso una rotta figlia)
		- canDeactivate (x controllare l'abbandono di una rotta)
		- canLoad (routing asincrono)
		- resolve (x precaricare i dati prima di attivare una rotta)
	ordine di processamento delle guardie
		1. canDeactivate
		2. canLoad (se il modulo viene caricato in modo asincrono, canLoad controlla se puo' essere caricato)
		3. canActivateChild
		4. canActivate
		5. resolve 
	se uno di guardiani ritorna false, tutti quelli che seguono non veranno eseguiti e la navigazione viene abortita
	route guard viene implementato come un servizio, implementando interfaccia CanActivate
		implementiamo il metodo canActivate() che puo' ritornare sia true/false che Observable/Promise
			se ritorna Observable/Promise, la navigazione continua solo se il tipo di ritorno viene risolto
	la guardia viene aggiunta alla configurazione delle rotte
		NOTA: una guardia puo' essere inserita a livello di una rotta padre, cio' significa, che tutte le rotte figlie saranno monitorate dalla tale guardia
	le guardie sono usate per controllare accesso da parte di utenti alle rotte specifiche (es. ruoli diversi accedono alle pagine diverse!)
	condivisione dei dati tra le guardie
		possiamo usare i parametri delle rotte (route.paramMap.get('id'))
		MA, la strada piu' comune x condividere i dati e' usare i servizi
			i servizi sono singleton
			quindi, solo una istanza viene creata e condivisa con tutti i componenti che la usano (iniettano)
			quindi, condivisa anche con le guardie
	canActivateChild guard
		simile a canActivate, ma viene eseguito nel momento di navigazione verso una rotta figlia
		usato x limitare accesso alle rotte figlie
		se cambia solo la rotta figlia, il canActivate NON viene rieseguito, invece canActivateChild si
	canDeactivate guard
		usato di solito x 
			- controllare il salvataggio dei dati
			- chiedere conferma all'utente prima di cambiare la rotta senza salvare i dati
		scatta solo se la navigazione avviene verso una rotta controllata da angular
		implementiamo interfaccia generica CanDeactivate<>, passando il tipo di componenente che usera questa guardia
		implementiamo metodo canDeactivate()
Lazy loading
	chiamato anche async routing, caricamento asincrono dei moduli 
		serve x migliorare i tempi di avvio della nostra app
		si basa sullo splitting della nostra app in piu' bundle, caricati on demand
		angular ci mette meno tempo a compilare la nostra app client side prima di visualizzarla all'utente 
		quando utente naviga verso un modulo lazy loaded, il codice di tale modulo viene caricato e compilato su richiesta
		x esempio funzionalita' accedute occasionalmente oppure da utenti specifici (es. amministratori) sono caricate solo quando servono
		e' importante capire in che modo angular builda e fornisce i file dell'app
	buiding e serving files
		nel momento di esecuzione di comando ng serve angular crea seguenti file
			- main.js (codice js della nostra app)
			- polyfills.js (codice che garantisce la compatibilita' con browser moderni)
			- runtime.js (js che serve x caricare altri js)
			- styles.js (stili)
			- vendor.js (js delle librerie esterne + quelle di angular, compilatore di angular)
		se compiliamo x produzione, eseguendo ng serve --prod, abbiamo solo 4 file in output
			- runtime.*.js
			- main.*.js
			- polyfills.*.js
			- styles.*.js
			NOTA: non abbiamo piu' vendor.js, di default angular usa AOT (Ahead Of Time compiler), che converte i nostri template e typescript in codice javascript
			-> questo meccanismo evita inserimento del compilatore angular nella lista di bundle (abbiamo gia' la nostra app compilata!)
				-> tutto si trova nel main.js
			il file piu' pesante rimane main.js -> ed e' il compito di lazy loading di ridurre la dimensione iniziale di questo file e caricare vari bundle
			in modo asincrono
	prerequisiti x usare caricamento lazy
		- le funzionalita' che vogliamo caricare in modalita' lazy devono essere collocate nei moduli separati
		- le rotte sono ragruppate sotto una rotta padre unica
			(il modulo e' associato alla rotta padre, quando avviene navigazione verso tale rotta, il modulo relativo viene caricato)
		- il modulo della funzionalita' NON deve essere importato in nessun altro modulo
		x caricare il modulo viene usato il metodo loadChildren: () => import('/product.module').then(m => m.Productodule)
			nella configurazione della rotta 
			loadChildren() scatta solo nel momento di navigazione verso relativa rotta
	canLoad guard
		serve x verificare una condizione prima di caricare una rotta asincrona (e quindi anche il modulo relativo)
		usato di solito x prevenire il caricamento della rotta a cui l'utente non e' abilitato
		e' sufficiente implementare l'interfaccia CanLoad (simile a quella canActivate)
		il caricamento asincrono ha uno svantaggio - richiesta ad hoc di caricare il modulo prima di passare alla rotta, puo' richiedere un tempo non trascurabile
			-> x migliorare le prestazioni viene usato il precaricamento dei moduli di funzionalita'
	precaricare i moduli delle funzionalita'
		il precaricamento avviene in base alle rotte aperte, se ad una sotto rotta viene associato un modulo, tale viene precaricato in base alla strategia 
		definita. il precaricamento ha senso solo se la probabilita' di richiesta del modulo e' abbastanza alta. per es. non ha senso x le funzionalita' accessibili
		solo x determinati utenti (es. amministratori). 
		ci sono 3 strategie di precaricamento:
			1 (default), nessun precaricameno, il modulo viene caricato solo nel momento di richiesta della relativa rotta
			2 (preload all), 
			3 (custom), possiamo definire una nostra strategia, di caricamento determinati moduli in un determinato momento
		la strategia scelta viene configurata a livello della configurazione delle rotta Route (RouterModule.forRoot(...)), impostando un secondo parametro 
			{ preloadingStrategy: PreloadAllModules }
		NOTA: canLoad guard blocca tutti i preloading! Ha senso, non precarichiamo quello che non serve.
		invece tutti altri guards NON bloccano il sistema di precaricamento
		se non vogliamo bloccare il precaricamento possiamo usare canActivate guard al posto di canLoad.
	strategia di un precaricamento custom 
		si basa sulla creazione di un servizio, e impostazione strategia custom nella configurazione della rotta
		preload strategy service
		la classe del servizio implementa l'interfaccia PreloadingStrategy
Recap
	
		
	
		
		
		
			