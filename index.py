class Climatempo():
	def __init__(self,nomeCidade,ufCidade,Requests,Json):
		self.token = '2c13e733281e9a602302fffb77310e49'
		self.nomeCidade = nomeCidade.capitalize()
		self.ufCidade = ufCidade.upper()
		self.req = Requests
		self.Json = Json
		self.bruteContent = '' #//VARIAVEL RESPONSAVEL POR RECEBER AS INFO DA REQUISICAO
		self.conteudox = ''
		self.conteudo = ''
		self.id = ''
		self.site = ''
		self.jsonPronto = ''
		self.result = {
			'temperatura': '',
			'umidade':'',
			'datahora':'',
			'condicao':'',
			'pressao':'',
			'venVeloc':'',
			'cidade':'',
			'estado':'',
			'pais':'',
			'fonte':''
		}

	def getId(self):
		self.bruteContent = self.req.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city?name='+ self.nomeCidade + '&state=' + self.ufCidade + '&token=' + self.token).content
		print(self.req.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city?name='+ self.nomeCidade + '&state=' + self.ufCidade + '&token=bd7915b6e2fb5e65d284c44dfaffcb71').content)
		self.conteudox = str(self.bruteContent)
		
		if 'id' in self.conteudox:
			return (self.conteudox[self.conteudox.find(':')+1:self.conteudox.find(',')])
		else:
			return 404

	def setResult(self):
		self.id = self.getId()

		if self.id == 404:
			return 404
		else:
			self.site = self.req.get ('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/'+ str(self.id) + '/current?token=' + self.token).content
			self.conteudo = self.site
			self.jsonPronto = self.Json.loads(self.conteudo.decode('utf-8'))
			self.result['temperatura'] = self.jsonPronto['data']['temperature']
			self.result['umidade'] = self.jsonPronto['data']['humidity']
			self.result['datahora'] = self.jsonPronto['data']['date']
			self.result['condicao'] = self.jsonPronto['data']['condition']
			self.result['pressao'] = self.jsonPronto['data']['pressure']
			self.result['venVeloc'] = self.jsonPronto['data']['wind_velocity']
			self.result['cidade'] = self.jsonPronto['name']
			self.result['estado'] = self.jsonPronto['state']
			self.result['pais'] = self.jsonPronto['country']
			self.result['fonte'] = 'Climatempo'

			return ''
	
	def getResult(self):
		return self.result