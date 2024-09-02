# Beslisboom AI-Verordening bètaversie

**Met deze beslisboom stel je vast of de AI-verordening geldt voor jouw overheidsorganisatie. En aan welke vereisten je dan moet voldoen.**

- Deze beslisboom is een bètaversie (betekenende dat deze website in ontwikkeling is. Volgende versies ontstaan op een open manier.)
- De informatie is niet compleet en er kunnen fouten in staan.
- Je bent zelf verantwoordelijk voor de informatie die je gebruikt.
- Overleg de uitkomsten van de beslisboom met een expert.
- In de beslisboom staat alleen informatie over de rollen van de overheid als [aanbieder](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst) en als [gebruiksverantwoordelijke](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst).

Voor vragen of opmerkingen over de beslisboom mail je naar: [ai-verordening@minbzk.nl](mailto::ai-verordening@minbzk.nl).

# AI-act-beslisboom

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/MinBZK/ai-act-decisiontree/main.svg?badge_token=d3dKEK97RwC1II15_W-nng)](https://results.pre-commit.ci/latest/github/MinBZK/ai-act-decisiontree/main?badge_token=d3dKEK97RwC1II15_W-nng)

Deze git repository bevat de beslisboom op basis van de AI Verordening. Het project omvat 3 onderdelen.

1. De beslisboom: [decision-tree.yaml](decision-tree.yaml)
2. Een diagram van de beslisboom: [decision-tree.html](decision-tree.html)
3. Een frontend voor de visualisatie van de beslisboom: [frontend](frontend/)

De Kubernetes deployment code staat bij  [infra](https://github.com/MinBZK/ai-validation-infra/apps/ai-act-beslisboom)

Door deze beslisboom te doorlopen, krijgt uw organisatie inzicht in de volgende vragen:

- Is er sprake van een **AI-systeem**, een **AI-systeem voor algemene doeleinden** of een **AI-model voor algemene doeleinden**?
- Is het systeem/model **open source** of niet?
- Is de AI-verordening van toepassing? Is er sprake van een **uitzonderingsgrond**?
- Binnen welke **risicocategorie** valt het AI-systeem?
- Is er sprake van een **systeemrisico** of **transparantierisico**?
- Bent u een **aanbieder** of een **gebruiksverantwoordelijke** van het AI-systeem?
- Aan welke **verplichtingen** moet u voldoen bij de inzet van het AI-systeem?

Om u te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI Verordening gelinkt per vraag.

## Beslisboom componenten

De beslisboom is gevat in [decision-tree.yaml](decision-tree.yaml). U kunt deze bekijken met elke editor die u fijn vindt.

De beslisboom heeft componenten die vastgelegd zijn in een schema. Zie [schema_decision_tree.json](schemas/schema_decision_tree.json). Dit schema zorgt ervoor dat het systeem weet welke velden verwacht worden.

De beslisboom is opgebouwd uit de volgende componenten:

```sh
version: string           # versie van decisionTree
name: string              # naam van decisionTree
questions: array(Question) # de vragen zoals gedefineerd hieronder

Question:                 # definitie van 1 vraag
  questionId: string      # een unique identifier voor de vraag
  question: string        # de vraag die gesteld wordt
  simplifiedQuestion: string  # versimpelde versie van de vraag
  category: string        # in welke categorie de vraag valt
  questionType: enum      # het type vraag
  description: string     # optioneel: een extra opmerking bij de vraag
  source: string          # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string      # optioneel: een link naar de bovengenoemde verwijzing
  answers: array(Answer)  # de mogelijke antwoorden zoals hieronder gedefineerd

Answer:                   # definitie van 1 antwoord
  answer: string          # de text van het antwoord
  nextQuestionId: string  # optioneel: de QuestionId van de volgende vraag
  subresult: string       # optioneel: een tussenresultaat voordat naar de volgende vraag verwezen wordt
  labels: array           # optioneel: labels toegekend aan het bijbehorende tussenresultaat
  result: string          # optioneel: het eindresultaat
  answerComment: string   # optioneel: extra commentaar bij het antwoord

Conclusion:               # definitie van 1 eindconclusie
  conslusion: string      # de eindconclusie
  conclusionComment: string   #optioneel: een extra opmerking bij de conclusie
  obligation: string      # de bij de conclusie bebehorende verplichtingen uit de AI verordening
  source: string          # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string      # optioneel: een link naar de bovengenoemde verwijzing
```

Naast de beslisboom is er ook een [definitions.yaml](definitions.yaml) bestand. Dit bestand bevat alle relevante definities die de beslisboom ondersteunen en extra uitleg nodig hebben, gebaseerd op de [Begrippenlijst van het algoritmekader](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst). Het verwachte schema van velden is gedocumenteerd in [schema_definitions.json](schemas/schema_definitions.json).

## Beslisboom diagram

De beslisboom is schematisch weergegeven in [decision-tree.html](decision-tree.html).
```
%% BEGIN AUTOGEN
        ---
title: Decision Tree
---
%%{
	init: {
		"theme": "base",
		"themeVariables": {
			"primaryColor": "#007bc7",
			"primaryTextColor": "#000000",
			"primaryBorderColor": "#007bc7",
			"lineColor": "#154273",
			"secondaryColor": "#CCE7F4"
		}
	}
}%%

flowchart TB
	c-12.0.1{{"U bent een aanbieder van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen. "}}
click c-12.0.1 callback "U bent een aanbieder van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen. "
	c-12.0.2{{"U bent een aanbieder van een hoog-risico AI-systeem."}}
click c-12.0.2 callback "U bent een aanbieder van een hoog-risico AI-systeem."
	c-12.0.3{{"U bent een aanbieder van een niet-hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-12.0.3 callback "U bent een aanbieder van een niet-hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-12.0.4{{"U bent een aanbieder van een niet-hoog-risico AI-systeem."}}
click c-12.0.4 callback "U bent een aanbieder van een niet-hoog-risico AI-systeem."
	c-12.1.2{{"U bent een aanbieder van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-12.1.2 callback "U bent een aanbieder van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-12.1.3{{"U bent een aanbieder van een hoog-risico AI-systeem voor algemene doeleinden."}}
click c-12.1.3 callback "U bent een aanbieder van een hoog-risico AI-systeem voor algemene doeleinden."
	c-12.1.6{{"U bent een aanbieder van een niet-hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-12.1.6 callback "U bent een aanbieder van een niet-hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-12.1.7{{"U bent een aanbieder van een niet-hoog-risico AI-systeem voor algemene doeleinden."}}
click c-12.1.7 callback "U bent een aanbieder van een niet-hoog-risico AI-systeem voor algemene doeleinden."
	c-12.2.1{{"U bent een aanbieder van een AI-model voor algemene doeleinden. Er is sprake van een systeemrisico."}}
click c-12.2.1 callback "U bent een aanbieder van een AI-model voor algemene doeleinden. Er is sprake van een systeemrisico."
	c-12.2.3{{"U bent een aanbieder van een AI-model voor algemene doeleinden."}}
click c-12.2.3 callback "U bent een aanbieder van een AI-model voor algemene doeleinden."
	c-12.2.4{{"U bent een aanbieder van een open-source AI-model voor algemene doeleinden."}}
click c-12.2.4 callback "U bent een aanbieder van een open-source AI-model voor algemene doeleinden."
	c-13.0.1{{"U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen. "}}
click c-13.0.1 callback "U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen. "
	c-13.0.2{{"U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem."}}
click c-13.0.2 callback "U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem."
	c-13.0.3{{"U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-13.0.3 callback "U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-13.0.4{{"U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem."}}
click c-13.0.4 callback "U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem."
	c-13.1.2{{"U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-13.1.2 callback "U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-13.1.3{{"U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem voor algemene doeleinden."}}
click c-13.1.3 callback "U bent een gebruiksverantwoordelijke van een hoog-risico AI-systeem voor algemene doeleinden."
	c-13.1.6{{"U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-13.1.6 callback "U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-13.1.7{{"U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem voor algemene doeleinden."}}
click c-13.1.7 callback "U bent een gebruiksverantwoordelijke van een niet-hoog-risico AI-systeem voor algemene doeleinden."
	c-13.2.1{{"U bent een gebruiksverantwoordelijke van een AI-model voor algemene doeleinden. Er is sprake van een systeemrisico."}}
click c-13.2.1 callback "U bent een gebruiksverantwoordelijke van een AI-model voor algemene doeleinden. Er is sprake van een systeemrisico."
	c-13.2.3{{"U bent een gebruiksverantwoordelijke van een AI-model voor algemene doeleinden."}}
click c-13.2.3 callback "U bent een gebruiksverantwoordelijke van een AI-model voor algemene doeleinden."
	c-14.0.1{{"U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-14.0.1 callback "U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-14.0.2{{"U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem."}}
click c-14.0.2 callback "U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem."
	c-14.0.5{{"U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."}}
click c-14.0.5 callback "U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem voor algemene doeleinden. Uw AI-systeem moet voldoen aan transparantieverplichtingen."
	c-14.0.6{{"U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem voor algemene doeleinden."}}
click c-14.0.6 callback "U bent een gebruiksverantwoordelijke en aanbieder van een hoog-risico AI-systeem voor algemene doeleinden."
	c-15.0{{"U gebruikt geen algoritme. De AI-verordening is niet van toepassing."}}
click c-15.0 callback "U gebruikt geen algoritme. De AI-verordening is niet van toepassing."
	c-15.1{{"Het is verboden om dit AI-systeem te gebruiken. Er is geen sprake van een uitzondering op de lijst van verboden AI-systemen."}}
click c-15.1 callback "Het is verboden om dit AI-systeem te gebruiken. Er is geen sprake van een uitzondering op de lijst van verboden AI-systemen."
	c-15.2{{"Er is sprake van een uitzondering op de lijst van verboden AI-systemen."}}
click c-15.2 callback "Er is sprake van een uitzondering op de lijst van verboden AI-systemen."
	c-15.3{{"Er is sprake van een uitzonderingsgrond. De AI-verordening is niet van toepassing."}}
click c-15.3 callback "Er is sprake van een uitzonderingsgrond. De AI-verordening is niet van toepassing."
	c-15.4{{"Het betreft een algoritme met impact, maar de AI-verordening is niet van toepassing."}}
click c-15.4 callback "Het betreft een algoritme met impact, maar de AI-verordening is niet van toepassing."
	c-15.5{{"Het betreft een algoritme met impact, maar de AI-verordening is niet van toepassing."}}
click c-15.5 callback "Het betreft een algoritme met impact, maar de AI-verordening is niet van toepassing."
	c-15.6{{"Uw algoritme is niet impactvol en de AI-verordening is niet van toepassing."}}
click c-15.6 callback "Uw algoritme is niet impactvol en de AI-verordening is niet van toepassing."
	c-15.7{{"U bent geen aanbieder en geen gebruiksverantwoordelijke. Deze beslisboom is gemaakt voor alleen deze twee rollen. Controleer nog een keer goed of één van deze rollen misschien toch op u van toepassing is."}}
click c-15.7 callback "U bent geen aanbieder en geen gebruiksverantwoordelijke. Deze beslisboom is gemaakt voor alleen deze twee rollen. Controleer nog een keer goed of één van deze rollen misschien toch op u van toepassing is."
	q-0("0: Algoritme")
click q-0 callback "Bevat de (beoogde) toepassing een algoritme?"
	q-1.0("1.0: AI-systeem")
click q-1.0 callback "Is de (beoogde) toepassing een AI-systeem?"
	q-1.1("1.1: AI-systeem voor algemene doeleinden")
click q-1.1 callback "Is de (beoogde) toepassing een AI-systeem voor algemene doeleinden?"
	q-1.2("1.2: AI-model voor algemene doeleinden")
click q-1.2 callback "Is de (beoogde) toepassing een AI-model voor algemene doeleinden?"
	q-1.0.1("1.0.1: Open of vrije licentie")
click q-1.0.1 callback "Wordt de toepassing onder een open of vrije licentie gedeeld?"
	q-1.0.2("1.0.2: Openbare broncodes en parameters")
click q-1.0.2 callback "Zijn de broncodes en parameters openbaar voor eenieder?"
	q-2.0("2.0: Uitzondering AI-verordening")
click q-2.0 callback "We gaan nu bepalen of er sprake is van een uitzondering op de AI-verordening.#specialnewline##specialnewline# Valt de (beoogde) toepassing onder een van de volgende categorieen? #specialnewline##specialnewline# - AI-systemen die uitsluitend in de handel worden gebracht, in gebruik worden gesteld of, al dan niet gewijzigd, worden gebruikt voor militaire, defensie- of nationale veiligheidsdoeleinden #specialnewline# - AI-systemen die niet in de Unie in de handel worden gebracht of in gebruik worden gesteld en waarvan de output in de Unie uitsluitend wordt gebruikt voor militaire, defensie- of nationale veiligheidsdoeleinden #specialnewline# - overheidsinstanties in derde landen of internationale organisaties die binnen het toepassingsgebied van de AI-verordening vallen, wanneer deze instanties of organisaties AI-systemen gebruiken in het kader van internationale samenwerking of overeenkomsten met de Unie of een of meer lidstaten op het gebied van rechtshandhaving en justitie #specialnewline# - onderzoeks-, test- of ontwikkelingsactiviteiten met betrekking tot AI-systemen of AI-modellen voor zij in de handel worden gebracht of in gebruik worden gesteld (testen onder reële omstandigheden valt hier niet onder) #specialnewline# - AI-systemen of AI-modellen, met inbegrip van hun output, die specifiek zijn ontwikkeld en in gebruik worden gesteld met wetenschappelijk onderzoek en wetenschappelijke ontwikkeling als enig doel"
	q-3.0("3.0: Verboden AI")
click q-3.0 callback "We gaan nu bepalen of het AI-systeem onder een van de verboden systemen uit Artikel 5 van de AI-verordening valt.#specialnewline##specialnewline# Betreft het een AI-systeem dat: #specialnewline##specialnewline# - gebruik kan gaan maken van subliminale technieken om mensen onbewust of bewust kunnen manipuleren, waardoor ze beslissingen nemen die ze anders niet zouden hebben genomen?#specialnewline# - gebruik kan gaan maken van kwetsbaarheden van individuen of specifieke groepen, zoals leeftijd, handicaps of sociale/economische omstandigheden, om het gedrag van die personen aanzienlijk te verstoren, wat kan leiden tot aanzienlijke schade bij henzelf of anderen?#specialnewline# - gebruikt kan worden om natuurlijke personen of groepen gedurende een periode te evalueren of te classificeren op basis van hun sociale gedrag of afgeleide persoonlijke kenmerken? #specialnewline# - gebruikt kan worden voor risicobeoordelingen van natuurlijke personen om het risico op crimineel gedrag te voorspellen, gebaseerd op profilering of persoonlijkheidskenmerken? (Dit geldt niet voor AI-systemen die worden gebruikt om menselijke beoordelingen te ondersteunen, gebaseerd op objectieve en verifieerbare feiten die rechtstreeks verband houden met criminele activiteiten) #specialnewline# - gebruikt kan worden om databanken voor gezichtsherkenning aan te leggen of aan te vullen door willkeurige gezichtsafbeeldingen van internet of CCTV-beelden te scrapen? #specialnewline# - gebruikt kan worden om emoties van een persoon op de werkplek of in het onderwijs af te leiden? (Dit is niet van toepassing als het gebruik van het AI-systeem is bedoeld voor medische- of veiligheidsdoeleinden)#specialnewline# - gebruikt kan worden om natuurlijke personen individueel in categorieën in te delen op basis van biometrische gegevens om ras, politieke opvattingen, lidmaatschap van een vakbond, religieuze of levensbeschouwelijke overtuigingen, seksleven of seksuele geaardheid af te leiden? (Dit verbod geldt niet voor het labelen of filteren van rechtmatig verkregen biometrische datasets, zoals afbeeldingen, op basis van biometrische gegevens, of voor categorisering van biometrische gegevens op het gebied van rechtshandhaving) #specialnewline# - gebruikt kan worden als een biometrisch systeem in de publieke ruimte voor identificatie op afstand in real-time, met het oog op de rechtshandhaving?"
	q-3.1("3.1: Uitzondering verboden AI")
click q-3.1 callback "Is er sprake van een van de volgende uitzonderingen?:#specialnewline##specialnewline# - Er is sprake van een rechtshandhavingsactiviteit i.v.m. een specifiek misdrijf (terrorisme, mensenhandel, seksuele uitbuiting van kinderen en materiaal over seksueel misbruik van kinderen, illegale handel in verdovende middelen en psychotrope stoffen, illegale handel in wapens, munitie en explosieven, moord, zware mishandeling, illegale handel in menselijke organen en weefsels, illegale handel in nucleaire en radioactieve stoffen, ontvoering, wederrechtelijke vrijheidsberoving en gijzeling, misdrijven die onder de rechtsmacht van het Internationaal Strafhof vallen, kaping van vliegtuigen/schepen, verkrachting, milieucriminaliteit, georganiseerde of gewapende diefstal, sabotage, deelneming aan een criminale organisatie die betrokken is bij een of meer van de bovengenoemde misdrijven)#specialnewline# - Er is sprake van gerichte opsporing van specifieke slachtoffers, ontvoering, mensenhandel en seksuele uitbuiting van mensen, vermiste personen; of het voorkomen van bedreigingen voor het leven of de fysieke veiligheid van personen of het reageren op de huidige of voorzienbare dreiging van een terreuraanslag"
	q-4.0("4.0: Veiligheidscomponent Bijlage 1B")
click q-4.0 callback "Is er sprake van een veiligheidscomponent als bedoeld in Bijlage I Sectie B van de AI-verordening?:#specialnewline##specialnewline# - Verordening (EG) nr. 300/2008 inzake gemeenschappelijke regels op het gebied van de beveiliging van de burgerluchtvaart#specialnewline# - Verordening (EU) nr. 168/2013 betreffende de goedkeuring van en het markttoezicht op twee- of driewielige voertuigen en vierwielers#specialnewline# - Verordening (EU) nr. 167/2013 inzake de goedkeuring van en het markttoezicht op landbouw- en bosvoertuigen#specialnewline# - Richtlijn 2014/90/EU inzake uitrusting van zeeschepen#specialnewline# - Richtlijn 2016/797 betreffende de interoperabiliteit van het spoorwegsysteem in de Europese Unie#specialnewline# - Verordening 2018/858 betreffende de goedkeuring van en het markttoezicht op motorvoertuigen en aanhangwagens daarvan en systemen, onderdelen en technische eenheden die voor dergelijke voertuigen zijn bestemd#specialnewline# - Verordening (EU) 2019/2144 betreffende de voorschriften voor de typegoedkeuring van motorvoertuigen en aanhangwagens daarvan en van systemen, onderdelen en technische eenheden die voor dergelijke voertuigen zijn bestemd wat de algemene veiligheid ervan en de bescherming van de inzittenden van voertuigen en kwetsbare weggebruikers betreft#specialnewline# - Verordening (EU) 2018/1139 inzake gemeenschappelijke regels op het gebied van burgerluchtvaart en tot oprichting van een Agentschap van de Europese Unie voor de veiligheid van de luchtvaart, voor zover het gaat om het ontwerp, de productie en het in de handel brengen van luchtvaartuigen, en hun motoren, propellors, onderdelen en apparatuur om het luchtvaartuig op afstand te besturen"
	q-4.1("4.1: Veiligheidscomponent Bijlage 1A")
click q-4.1 callback "Is er sprake van een veiligheidscomponent als bedoeld in Bijlage I sectie A van de AI-verordening?:#specialnewline##specialnewline# - Richtlijn 2006/42/EG betreffende machines#specialnewline# - Richtlijn 2009/48/EG betreffende de veiligheid van speelgoed#specialnewline# - Richtlijn 2013/53/EU betreffende pleziervaartuigen en waterscooters#specialnewline# - Richtlijn 2014/33/EU betreffende de harmonisatie van de wetgevingen van de lidstaten inzake liften en veligheidscomponenten voor liften#specialnewline# - Richtlijn 2014/43/EU betreffende de harmonisatie van de wetgevingen van de lidstaten inzake apparaten en beveiligingssystemen bedoeld voor gebruik op plaatsen waar ontploffingsgevaar kan heersen#specialnewline# - Richtlijn 2014/53/EU betreffende de harmonisatie van wetgevingen van de lidstaten inzake het op de markt aanbieden van radioapparatuur#specialnewline# - Richtlijn 2014/68/EU betreffende de harmonisatie van wetgevingen van de lidstaten inzake het op de markt aanbieden van drukapparatuur#specialnewline# - Verordening 2016/424 betreffende kabelbaaninstallaties#specialnewline# - Verordening (EU) 2016/425 betreffende persoonlijke beschermingsmiddelen#specialnewline# - Verordening (EU) 2016/426 betreffende gasverbrandingstoestellen#specialnewline# - Verordening (EU) 2017/745 betreffende medische hulpmiddelen#specialnewline# - Verordening (EU) 2017/746 betreffende medische hulpmiddelen voor in-vitrodiagnostiek"
	q-4.2("4.2: Conformiteits-beoordeling")
click q-4.2 callback "Moet het product waarvan het AI-systeem de veiligheidscomponent vormt een conformiteits-beoordeling door een derde partij laten uitgevoeren met het oog op het in de handel brengen of in gebruik stellen van dat product op grond van de in Bijlage I Sectie A opgenomen harmonisatiewetgeving van de Europese Unie?"
	q-5.0("5.0: Hoog-risico AI: biometrie")
click q-5.0 callback "We gaan nu bepalen of het AI-systeem onder een van de hoog-risico systemen uit Bijlage 3 van de AI-verordening valt. Betreft het een AI-systeem op het gebied van biometrie? Hieronder vallen:#specialnewline# - systemen voor biometrische identificatie op afstand (dit geldt niet voor AI-systemen die bedoeld zijn om te worden gebruikt voor biometrische verificatie met als enig doel te bevestigen dat een specifieke natuurlijke persoon de persoon is die hij of zij beweert te zijn)#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor biometrische categorisering op basis van gevoelige of beschermde eigenschappen of kenmerken, of op basis van wat uit die eigenschappen of kenmerken wordt afgeleid#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor emotieherkenning"
	q-5.1("5.1: Hoog-risico AI: kritieke infrastructuur")
click q-5.1 callback "Betreft het een AI-systeem op het gebied van kritieke infrastructuur? Hieronder vallen AI-systemen die bedoeld zijn om te worden gebruikt als veiligheidscomponent bij het beheer of de exploitatie van kritieke digitale infrastructuur, wegverkeer of bij de levering van water, gas, verwarming en elektriciteit."
	q-5.2("5.2: Hoog-risico AI: onderwijs en beroepsopleiding")
click q-5.2 callback "Betreft het een AI-systeem op het gebied van onderwijs en beroepsopleiding? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het bepalen van toegang of toelating tot of het toewijzen van natuurlijke personen aan instellingen voor onderwijs en beroepsonderwijs op alle niveaus#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het evalueren van leerresultaten, ook wanneer die resultaten worden gebruikt voor het sturen van het leerproces van natuurlijke personen in instellingen voor onderwijs en beroepsonderwijs op alle niveaus#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het beoordelen van het passende onderwijsniveau dat een persoon zal ontvangen of waartoe hij toegang zal hebben, in het kader van of binnen instellingen voor onderwijs en beroepsonderwijs op alle niveaus#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het monitoren en detecteren van ongeoorloofd gedrag van studenten tijdens toetsen in de context van of binnen instellingen voor onderwijs en beroepsonderwijs op alle niveaus."
	q-5.3("5.3: Hoog-risico AI: werkgelegenheid, personeel en arbeid")
click q-5.3 callback "Betreft het een AI-systeem op het gebied van werkgelegenheid, personeelsbeheer en toegang tot zelfstandige arbeid? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het werven of selecteren van natuurlijke personen, met name voor het plaatsen van gerichte vacatures, het analyseren en filteren van sollicitaties, en het beoordelen van kandidaten#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het nemen van besluiten die van invloed zijn op de voorwaarden van arbeidsgerelateerde betrekkingen, de bevordering of beëindiging van arbeidsgerelateerde contractuele betrekkingen, voor het toewijzen van taken op basis van individueel gedrag of persoonlijke eigenschappen of kenmerken, of voor het monitoren en evalueren van prestaties en gedrag van personen in dergelijke betrekkingen."
	q-5.4("5.4: Hoog-risico AI: diensten en uitkeringen")
click q-5.4 callback "Betreft het een AI-systeem op het gebied van toegang en gebruik van essentiële particuliere en publieke diensten en uitkeringen? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om door of namens overheidsinstanties te worden gebruikt om te beoordelen of natuurlijke personen in aanmerking komen voor essentiële overheidsuitkeringen en -diensten, waaronder gezondheidsdiensten, of om dergelijke uitkeringen en diensten te verlenen, te beperken, in te trekken of terug te vorderen#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het beoordelen van de kredietwaardigheid van natuurlijke personen of voor het vaststellen van hun kredietscore, met uitzondering van AI-systemen die gebruikt worden om financiële fraude op te sporen#specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor risicobeoordeling en prijsstelling met betrekking tot natuurlijke personen in het geval van levens- en ziektekostenverzekeringen#specialnewline# - AI-systemen die bedoeld zijn om noodoproepen van natuurlijke personen te evalueren en te classificeren of om te worden gebruikt voor het inzetten of het bepalen van prioriteiten voor de inzet van hulpdiensten, onder meer van politie, brandweer en ambulance, alsook van systemen voor de triage van patiënten die dringend medische zorg behoeven."
	q-5.5("5.5: Hoog-risico AI: rechtshandhaving")
click q-5.5 callback "Betreft het een AI-systeem op het gebied van rechtshandhaving? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om door of namens rechtshandhavingsinstanties, of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties of namens hen, te worden gebruikt om het risico te beoordelen dat een natuurlijke persoon het slachtoffer wordt van strafbare feiten#specialnewline# - AI-systemen die bedoeld zijn om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt als leugendetector of soortgelijke instrumenten #specialnewline# - AI-systemen die bedoeld zijn om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om de betrouwbaarheid van bewijsmateriaal tijdens het onderzoek naar of de vervolging van strafbare feiten te beoordelen - AI-systemen die bedoeld zijn om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om te beoordelen hoe groot het risico is dat een natuurlijke persoon (opnieuw) een strafbaar feit zal plegen, niet uitsluitend op basis van profilering van natuurlijke personen, of om persoonlijkheidskenmerken en eigenschappen of eerder crimineel gedrag van natuurlijke personen of groepen te beoordelen #specialnewline# - AI-systemen die bedoeld zijn om door of namens rechtshandhavingsinstanties of door instellingen, organen en instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om natuurlijke personen te profileren tijdens het opsporen, onderzoeken of vervolgen van strafbare feiten."
	q-5.6("5.6: Hoog-risico AI: migratie-, asiel- en grenstoezicht")
click q-5.6 callback "Betreft het een AI-systeem op het gebied van migratie-, asiel- en grenstoezichtsbeheer? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om door of namens bevoegde overheidsinstanties of door instellingen, organen of instanties van de Unie te worden gebruikt als leugendetector of soortgelijke hulpmiddelen #specialnewline# - AI-systemen die bedoeld zijn om door of namens bevoegde overheidsinstanties of door instellingen, organen of instanties van de Unie te worden gebruikt om risico’s te beoordelen, waaronder een veiligheidsrisico, een risico op illegale migratie of een gezondheidsrisico, uitgaat van een natuurlijke persoon die voornemens is het grondgebied van een lidstaat te betreden of dat heeft gedaan #specialnewline# - AI-systemen die bedoeld zijn om door of namens bevoegde overheidsinstanties of door instellingen, organen of instanties van de Unie te worden gebruikt om bevoegde overheidsinstanties bij te staan bij de behandeling van aanvragen voor asiel, visa of verblijfsvergunningen en bij de behandeling van aanverwante klachten in verband met het al dan niet in aanmerking komen van de natuurlijke personen die een aanvraag voor een status indienen, met inbegrip van hieraan gerelateerde beoordelingen van de betrouwbaarheid van bewijsmateriaal #specialnewline# - AI-systemen die bedoeld zijn om door of namens bevoegde overheidsinstanties, of door instellingen, organen of instanties van de Unie, te worden gebruikt in het kader van migratie-, asiel- of grenstoezichtsbeheer, met het oog op het opsporen, herkennen of identificeren van natuurlijke personen, met uitzondering van de verificatie van reisdocumenten."
	q-5.7("5.7: Hoog-risico AI: rechtsbedeling en democratie")
click q-5.7 callback "Betreft het een AI-systeem voor rechtsbedeling en democratische processen? Hieronder vallen:#specialnewline# - AI-systemen die bedoeld zijn om door of namens een gerechtelijke instantie te worden gebruikt om een gerechtelijke instantie te ondersteunen bij het onderzoeken en uitleggen van feiten of de wet en bij de toepassing van het recht op een concrete reeks feiten of om te worden gebruikt op soortgelijke wijze in het kader van alternatieve geschillenbeslechting #specialnewline# - AI-systemen die bedoeld zijn om te worden gebruikt voor het beïnvloeden van de uitslag van een verkiezing of referendum of van het stemgedrag van natuurlijke personen bij de uitoefening van hun stemrecht bij verkiezingen of referenda. Dit geldt niet voor AI-systemen aan de output waarvan natuurlijke personen niet rechtstreeks worden blootgesteld, zoals instrumenten die worden gebruikt om politieke campagnes te organiseren, te optimaliseren of te structureren vanuit administratief of logistiek oogpunt."
	q-5.1.0("5.1.0: Uitzondering hoog-risico AI")
click q-5.1.0 callback "We gaan nu bepalen of er sprake is van een uitzondering op de lijst van hoog-risico AI systemen.#specialnewline# Bent u een aanbieder van een AI-systeem dat is bedoeld voor een van de volgende doeleinden?#specialnewline# - Het uitvoeren van een beperkte procedurele taak waarbij er geen significant risico is op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen?#specialnewline# - Het verbeteren van het resultaat van een eerder voltooide menselijke activiteit en waarbij er geen significant risico is op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen?#specialnewline# - Het opsporen van besluitvormingspatronen of afwijkingen van eerdere besluitvormingspatronen en waarbij het niet bedoeld is om de eerder voltooide menselijke beoordeling zonder behoorlijke menselijke toetsing te vervangen of te beïnvloeden?#specialnewline# - Het uitvoeren van een voorbereidende taak voor een beoordeling die relevant is voor de in bijlage III vermelde gebruiksgevallen?"
	q-5.1.1("5.1.1: Profilering")
click q-5.1.1 callback "Voert het AI-systeem profilering van natuurlijke personen uit? Bij profilering is er altijd sprake van een hoog risico."
	q-6.0("6.0: Systeemrisico")
click q-6.0 callback "We gaan nu bepalen of er sprake is van een systeemrisico. #specialnewline##specialnewline# Is er sprake van een cumulatieve hoeveelheid rekenkracht van FLOPs groter dan 10^25?#specialnewline##specialnewline# - FLOPs zijn floating point operations per second.#specialnewline# - FLOPs is een eenheid die wordt gebruikt om de rekenkracht van CPU’s aan te duiden.#specialnewline# - CPUs zijn Central Processing Units.#specialnewline# - Dit is de centrale verwerkingseenheid van een computer, smartphone of tablet. De CPU voert het rekenwerk uit waardoor programma’s draaien en hardware wordt aangestuurd."
	q-7.0("7.0: Transparantieverplichtingen")
click q-7.0 callback "We gaan nu bepalen of het AI-systeem onder de transparantieverplichtingen van Artikel 50 valt.#specialnewline##specialnewline# Is er sprake van een AI-systeem dat:#specialnewline##specialnewline# - direct communiceert met mensen (zoals chatbots)?#specialnewline# - synthetische afbeeldingen, audio, video of tekst content genereert en manipuleert? Bijvoorbeeld een deepfake.#specialnewline# - aan emotieherkenning of biometrische categorisatie doet?"
	q-7.1("7.1: Uitzondering transparantieverplichtingen")
click q-7.1 callback "Is er sprake van AI waarvan het bij wet is toegestaan om te gebruiken om strafbare feiten op te sporen, te voorkomen, te onderzoeken of te vervolgen?"
	q-8.0("8.0: Aanbieder")
click q-8.0 callback "We gaan nu bepalen welke rol u heeft: aanbieder, gebruiksverantwoordelijke, of beide.#specialnewline##specialnewline# Gaat u een AI-systeem of een AI-model op de markt brengen of in gebruik stellen onder eigen naam of merk, al dan niet tegen betaling?"
	q-8.1("8.1: Gebruiksverantwoordelijke")
click q-8.1 callback "Bent u een overheidsinstantie die een AI-systeem onder eigen verantwoordelijkheid gebruikt? (Het AI-systeem wordt niet gebruikt in het kader van een persoonlijke niet-beroepsactiviteit)."
	q-8.2("8.2: Naam of merk op hoog-risico AI-systeem")
click q-8.2 callback "Zet u uw naam of merk op een AI-systeem met een hoog risico dat reeds in de handel is gebracht of in gebruik is gesteld (onverminderd contractuele regelingen waarin wordt bepaald dat de verplichtingen anders worden toegewezen)?"
	q-8.3("8.3: Substantiële wijziging in hoog-risico AI-systeem")
click q-8.3 callback "Brengt u een substantiële wijziging aan in een AI-systeem met een hoog risico dat reeds in de handel is gebracht of reeds in gebruik is gesteld, op zodanige wijze dat het systeem een AI-systeem met een hoog risico blijft op grond van Artikel 6?"
	q-8.4("8.4: Wijziging beoogde doel hoog-risico AI-systeem")
click q-8.4 callback "Wijzigt u het beoogde doel van een AI-systeem, met inbegrip van een AI-systeem voor algemene doeleinden, dat niet als een systeem met een hoog risico is geclassificeerd en reeds in de handel is gebracht of in gebruik is gesteld, op zodanige wijze dat het betrokken AI-systeem een AI-systeem met een hoog risico overeenkomstig Artikel 6 wordt?"
	q-9.0("9.0: Impactvol algoritme")
click q-9.0 callback "Gebruikt u een algoritme met impact (rechtsgevolgen voor de burger of classificatie van burgers of groepen) volgens categorie B van de Handreiking van het Algoritmeregister?"
	q-9.1("9.1: Uitzonderingsgronden Handreiking Algoritmeregister")
click q-9.1 callback "Valt uw toepassing onder één van de uitzonderingsgronden categorie C of D van de Handreiking van het Algoritmeregister?"
	q-0 -->|Ja| q-1.0
	q-0 -->|Nee| c-15.0
	q-1.0 -->|Ja| q-1.1
	q-1.0 -->|Nee| q-1.2
	q-1.1 -->|Ja| q-1.0.1
	q-1.1 -->|Nee| q-1.0.1
	q-1.2 -->|Ja| q-1.0.1
	q-1.2 -->|Nee| q-9.0
	q-1.0.1 -->|Ja| q-1.0.2
	q-1.0.1 -->|Nee| q-2.0
	q-1.0.2 -->|Ja| q-2.0
	q-1.0.2 -->|Nee| q-2.0
	q-2.0 -->|Ja| c-15.3
	q-2.0 -->|Nee: AI-systeem, AI-systeem voor algemene doeleinden| q-3.0
	q-2.0 -->|Nee: AI-model voor algemene doeleinden| q-6.0
	q-3.0 -->|Ja| q-3.1
	q-3.0 -->|Nee| q-4.0
	q-3.1 -->|Ja| c-15.2
	q-3.1 -->|Nee| c-15.1
	q-4.0 -->|Ja| q-7.0
	q-4.0 -->|Nee| q-4.1
	q-4.1 -->|Ja| q-4.2
	q-4.1 -->|Nee| q-5.0
	q-4.2 -->|Ja| q-7.0
	q-4.2 -->|Nee| q-5.0
	q-5.0 -->|Ja| q-5.1.0
	q-5.0 -->|Nee| q-5.1
	q-5.1 -->|Ja| q-5.1.0
	q-5.1 -->|Nee| q-5.2
	q-5.2 -->|Ja| q-5.1.0
	q-5.2 -->|Nee| q-5.3
	q-5.3 -->|Ja| q-5.1.0
	q-5.3 -->|Nee| q-5.4
	q-5.4 -->|Ja| q-5.1.0
	q-5.4 -->|Nee| q-5.5
	q-5.5 -->|Ja| q-5.1.0
	q-5.5 -->|Nee| q-5.6
	q-5.6 -->|Ja| q-5.1.0
	q-5.6 -->|Nee| q-5.7
	q-5.7 -->|Ja| q-5.1.0
	q-5.7 -->|Nee| q-7.0
	q-5.1.0 -->|Ja| q-5.1.1
	q-5.1.0 -->|Nee| q-7.0
	q-5.1.1 -->|Ja| q-7.0
	q-5.1.1 -->|Nee| q-7.0
	q-6.0 -->|Ja| q-8.0
	q-6.0 -->|Nee| q-8.0
	q-7.0 -->|Ja| q-7.1
	q-7.0 -->|Nee: geen open-source, open-source, hoog-risico AI, open-source, AI-model voor algemene doeleinden| q-8.0
	q-7.0 -->|Nee: open-source, geen hoog-risico AI, niet-verboden AI| q-9.0
	q-7.1 -->|Ja: geen open-source, open-source, hoog-risico AI| q-8.0
	q-7.1 -->|Ja: open-source, geen hoog-risico AI, niet-verboden AI| q-9.0
	q-7.1 -->|Nee| q-8.0
	q-8.0 -->|Ja: AI-systeem, hoog-risico AI, transparantierisico| c-12.0.1
	q-8.0 -->|Ja: AI-systeem, hoog-risico AI, geen transparantierisico| c-12.0.2
	q-8.0 -->|Ja: AI-systeem, geen hoog-risico AI, transparantierisico| c-12.0.3
	q-8.0 -->|Ja: AI-systeem, geen hoog-risico AI, geen transparantierisico| c-12.0.4
	q-8.0 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, transparantierisico| c-12.1.2
	q-8.0 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, geen transparantierisico| c-12.1.3
	q-8.0 -->|Ja: AI-systeem voor algemene doeleinden, geen hoog-risico AI, transparantierisico| c-12.1.6
	q-8.0 -->|Ja: AI-systeem voor algemene doeleinden, geen hoog-risico AI, geen transparantierisico| c-12.1.7
	q-8.0 -->|Ja: AI-model voor algemene doeleinden, systeemrisico| c-12.2.1
	q-8.0 -->|Ja: AI-model voor algemene doeleinden, geen systeemrisico, geen open-source| c-12.2.3
	q-8.0 -->|Ja: AI-model voor algemene doeleinden, geen systeemrisico, open-source| c-12.2.4
	q-8.0 -->|Nee| q-8.1
	q-8.1 -->|Ja: hoog-risico AI| q-8.2
	q-8.1 -->|Ja: AI-systeem, geen hoog-risico AI, transparantierisico| c-13.0.3
	q-8.1 -->|Ja: AI-systeem, geen hoog-risico AI, geen transparantierisico| c-13.0.4
	q-8.1 -->|Ja: AI-systeem voor algemene doeleinden, geen hoog-risico AI, transparantierisico| c-13.1.6
	q-8.1 -->|Ja: AI-systeem voor algemene doeleinden, geen hoog-risico AI, geen transparantierisico| c-13.1.7
	q-8.1 -->|Ja: AI-model voor algemene doeleinden, systeemrisico| c-13.2.1
	q-8.1 -->|Ja: AI-model voor algemene doeleinden, geen systeemrisico| c-13.2.3
	q-8.1 -->|Nee| c-15.7
	q-8.2 -->|Ja: AI-systeem, hoog-risico AI, transparantierisico| c-14.0.1
	q-8.2 -->|Ja: AI-systeem, hoog-risico AI, geen transparantierisico| c-14.0.2
	q-8.2 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, transparantierisico| c-14.0.5
	q-8.2 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, geen transparantierisico| c-14.0.6
	q-8.2 -->|Nee| q-8.3
	q-8.3 -->|Ja: AI-systeem, hoog-risico AI, transparantierisico| c-14.0.1
	q-8.3 -->|Ja: AI-systeem, hoog-risico AI, geen transparantierisico| c-14.0.2
	q-8.3 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, transparantierisico| c-14.0.5
	q-8.3 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, geen transparantierisico| c-14.0.6
	q-8.3 -->|Nee| q-8.4
	q-8.4 -->|Ja: AI-systeem, hoog-risico AI, transparantierisico| c-14.0.1
	q-8.4 -->|Ja: AI-systeem, hoog-risico AI, geen transparantierisico| c-14.0.2
	q-8.4 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, transparantierisico| c-14.0.5
	q-8.4 -->|Ja: AI-systeem voor algemene doeleinden, hoog-risico AI, geen transparantierisico| c-14.0.6
	q-8.4 -->|Nee: AI-systeem, hoog-risico AI, transparantierisico| c-13.0.1
	q-8.4 -->|Nee: AI-systeem, hoog-risico AI, geen transparantierisico| c-13.0.2
	q-8.4 -->|Nee: AI-systeem voor algemene doeleinden, hoog-risico AI, transparantierisico| c-13.1.2
	q-8.4 -->|Nee: AI-systeem voor algemene doeleinden, hoog-risico AI, geen transparantierisico| c-13.1.3
	q-9.0 -->|Ja| q-9.1
	q-9.0 -->|Nee| c-15.6
	q-9.1 -->|Ja| c-15.5
	q-9.1 -->|Nee| c-15.4
subgraph soort_toepassing
q-0
q-1.0
q-1.1
q-1.2
end
subgraph open_source
q-1.0.1
q-1.0.2
end
subgraph publicatiecategorie
q-2.0
q-3.0
q-3.1
q-4.0
q-4.1
q-4.2
q-5.0
q-5.1
q-5.2
q-5.3
q-5.4
q-5.5
q-5.6
q-5.7
q-5.1.0
q-5.1.1
end
subgraph systeemrisico
q-6.0
end
subgraph transparantieverplichting
q-7.0
q-7.1
end
subgraph rol
q-8.0
q-8.1
q-8.2
q-8.3
q-8.4
end
subgraph impactvol
q-9.0
q-9.1
end
classDef commonStyle fill:#FFFFFF,stroke:#39870c,stroke-width:2px
class soort_toepassing commonStyle
class open_source commonStyle
class publicatiecategorie commonStyle
class systeemrisico commonStyle
class transparantieverplichting commonStyle
class rol commonStyle
class impactvol commonStyle
%% END AUTOGEN
```
## Frontend

Om door de beslisboom te lopen is een visualizatie tool gemaakt. Met deze tool kunt u door de vragen lopen. De frontend is beschikbaar op deze [website](https://ai-act-decisiontree.apps.digilab.network). Voor nu is er nog een wachtwoord nodig om de website te bekijken. Deze kan bij Ruth worden opgevraagd.

### Frontend locaal draaien

Om de development omgeving te standariseren maken we gebruik van [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).

Als u in de devcontainer zit kunt u de volgende commandos uitvoeren. Voordat dit kan gaat u eerst in de frontend/ folder staan met een terminal.

Start de tool:

```sh
npm run dev
```

Na het starten is de tool beschikbaar op deze [site](http://localhost:5173)

### Bouwen van de frontend

We maken gebruik van containers zodat de applicatie overal gedraaid kan worden waar u containers kan draaien. Een voorbeeld hiervan in kubernetes. Voordat u dit kan doen moet men eerst [docker](https://docs.docker.com/get-docker/) installeren.

Om de container te bouwen kunt u het volgende doen:

```sh
docker compose build
```

Om de gebouwde container te starten kan u het volgende doen:

```sh
docker compose up
```

Nu is de website beschikbaar op deze locale [site](http://localhost:9090)

## Infra

Er is een klein stukje infra code geschreven voor kubernetes zodat de applicaties gehost kan worden. Om dit uit te kunnen voeren heeft u een kubernetes cluster nodig en [kubectl](https://kubernetes.io/docs/tasks/tools/). Dit instellen laten we buiten beschouwing voor deze readme. Als men het ingesteld heeft kan met het volgende commando uitvoeren.

```sh
kubectl apply -k infra/
```


## Validatie schema

Door het volgende script te runnen, kunt u controlen of het bestand decision-tree.yaml en het bestand definitions.yaml (technisch) valide zijn. Eventuele (syntax)fouten worden hiermee aangegeven.

```sh
./script/validate --file_pairs schemas/schema_decision_tree.json:decision-tree.yaml schemas/schema_definitions.json:definitions.yaml
```

## Pre-commit

Om pre-commit lokaal in te schakelen, voer het volgende uit:
```sh
pip install pre-commit
pre-commit install
```

Bij volgende commits zullen alle hooks worden uitgevoerd.

Je kunt alle hooks handmatig als volgt uitvoeren:
```sh
pre-commit run --all-files
```

Pre-commit runt ook als CI/CD check step voor het mergen naar `main`.
