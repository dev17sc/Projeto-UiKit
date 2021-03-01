@currentModulo = {}

@RelatorioMassaFiltros =
  # list: [
  #   {id: 1, nome: 'Inadimplencia Cobranca 1'},
  #   {id: 2, nome: 'Inadimplencia Cobranca 2'}
  # ]
  init: (opt={}) ->
    @filtros = currentModulo?.relatorio_massa?.filtros || {}
    @key = opt.key
    return unless @_isValid()
    @filtroConfig = @filtros?[@key]
    @filtroList = @filtroConfig.list
    @params = {}
    alert('Passe a key em relatorioMassaCtrl.init(key: "xxxxxxxxxxx")') unless opt.key
    @_updateList()
    @_escutarSocket()
    @_setLabel()
    @newRecord = false
    @nomeando = false
    @renomeando = false


    # marca o último ou inicia a criação do filtro
    @params.id = @list.findByField('ultimo', true)?.id || @list[0]?.id
    @novoFiltro() unless @params.id
    @onChange = opt.onChange
    opt.formParams.relatorio_massa_filtro = @params
    @onChangeCallback()

    @
  renomear: ->
    @request 'update',
      params:
        nome: @params.nome
      onSuccess: (data) => @cancelarNome()
  excluir: ->
    exec = =>
      @request 'destroy',
        onSuccess: (data) =>
          @list.removeById @params.id
          @novoFiltro() if @list.empty()
          @params.id = @list[0]?.id if @list.any()
          @onChangeCallback()

    scAlert.open
      title: 'Excluir?',
      buttons: [
        {label: 'Sim', color: 'green', action: -> exec()}
        {label: 'Não', color: 'red'}
      ]

  request: (type, opt) ->
    params =
      request_type: type
      filtro_id: @params.id

    Object.assign(params, opt.params) if opt.params

    $.ajax
      url: "#{baseUrlController()}/relatorio_massa_filtros_request"
      type: 'POST'
      data: params
      success: (data) => opt.onSuccess(data)
      error: (req) =>
        messages = req?.responseJSON?.messages || 'Erro ao executar'
        @_showMessages(title: 'Erro', messages: messages, color: 'red') if messages
  novoFiltro: ->
    @_setLabel 'Novo Filtro'
    @newRecord = true
    @params.nome = @filtroConfig.nome
    @params.nome = "#{@params.nome} #{@list.length + 1}" if @list.any()
    @params.key = @key
    @lastId = @params.id
    delete @params.id
    delete @params.atualizar_args
    @nomeando = true
  renomearForm: ->
    @params.nome = @_selected()?.nome
    @nomeando = true
    @renomeando = true
  cancelarNome: (opt={}) ->
    @_setLabel()
    @params.id ||= @lastId
    @onChangeCallback() if @newRecord
    delete @params.key
    delete @params.nome
    @newRecord = false
    @nomeando = false
    @renomeando = false
    @lastId = null
  reloadArgs: -> @onChangeCallback()
  salvarArgs: ->
    if @params.atualizar_args
      delete @params.atualizar_args
      return
    @params.atualizar_args = true
  onChangeCallback: (opt={}) ->
    filtro = opt.filtro || @_selected()
    filtro = Object.clone(filtro)
    @onChange?(filtro) #if savedParams
  # private
  _isValid: ->
    errors = []
    if isBlank(@filtros)
      errors.push 'Necessário cadastrar o modulo em RelatorioMassaFiltro::TIPOS_FILTROS'
      errors.push 'Teste no console do Chrome: currentModulo.relatorio_massa.filtros'

    if Object.any(@filtros) && !Object.keys(@filtros).includes @key
      errors.push "#{@key} não está presente nos filtros passados nos: currentModulo.relatorio_massa.filtros"

    if errors.any()
      scAlert.open
        title: 'Relatorio Massa Erro'
        messages: errors
        buttons: [
          label: 'OK'
          color: 'red'
        ]
    errors.empty()
  _setLabel: (label=null) ->
    @label = label || 'Filtros Salvos'
  _showMessages: (opt={}) ->
    scAlert.open({title: opt.title, messages: opt.messages, buttons: [{label: 'OK', color: opt.color}]})
  _updateList: (opt={}) ->
    list = @filtroList || []
    filtro = opt.filtro
    if filtro
      list.addOrExtend filtro
      @params.id = filtro.id
      @onChangeCallback(filtro: filtro)
      @filtroList = list
      @cancelarNome()
    @list = list

    currentModulo?.relatorio_massa?.filtros[@key]?.list = @list
  _escutarSocket: ->
    canal = "relatorio-massa-#{currentCliente().id}"
    channelStopListen canal
    channelListen canal,
      onJsonData: (data) =>
        @_updateList(filtro: data.filtro) if data.filtro
        @_showMessages(title: 'Erro ao salvar Relatório em Massa', messages: data.errors, color: 'red') if data.errors
  _selected: -> @list?.findByField('id', @params.id)


@screenMainCtrl =
  deviceType: () ->
    return 'phone'   if @isSize.xs() || @isSize.sm()
    return 'tablet'  if @isSize.md()
    return 'desktop' if @isSize.lg()
  isSize:
    xs: -> (window.innerWidth < 480)
    sm: -> (479 < window.innerWidth < 960)
    md: -> (959 < window.innerWidth < 1280)
    lg: -> (1279 < window.innerWidth)

@scModal =
  # modal = scModal.new '.sc-modal-xxxx'
  # modal.open()
  # modal.close()
  body: $('body')

  new: (elemento, opts={})->
    @box = $(elemento)
    @boxBody = $("#{elemento} .sc-modal")
    @onOpen  = opts.onOpen
    @onClose = opts.onClose
    $.extend {}, @
  open: ->
    @box.show 0, =>
      @box.addClass 'active'
      @boxBody.addClass 'active'
      @body.css 'overflow', 'hidden'
      informNativeAppModaIsOpened?(true)
      @onOpen?()
    return
  close: ->
    @box.removeClass 'active'
    @boxBody.removeClass 'active'
    @body.css 'overflow', 'auto'
    setTimeout ( => @box.hide() ), 250
    informNativeAppModaIsOpened?(false)
    @onClose?()
    return




@scAlert =
  # How to use
  # scAlert.open
  #   title: 'Deseja Excluir?'
  #   messages: ['Registros excluído não são recuperáveis', 'Tenha certeza absoluta']
  #   buttons: [
  #     {
  #       label: 'sim'
  #       color: 'green'
  #       action: ->
  #         alert("Apagado com sucesso")
  #     }
  #     {
  #       label: 'não'
  #       color: 'red'
  #     }
  #   ]
  templates:
    box: "
      <div class='sc-alert jq-sc-alert'>
        <div class='sc-alert-box sc-box-shadow-z3'>
          <div class='sc-alert-close'><i class='sc-badge-hover-red sc-icon-fechar-1 sc-cursor-pointer'></i></div>
          <h2 class='sc-alert-title'>Alerta!</h2>
          <div class='sc-alert-messages'></div>
          <div class='sc-alert-buttons'></div>
        </div>
      </div>
    "
    button: "<a class='sc-btn sc-btn-block-only-xs'></a>"
    message: "<p></p>"
  open: (opts={}) ->
    $('body').css {'overflow': 'hidden'}
    box = $(@templates.box).appendTo($('body'))
    box.find(".sc-alert-title").text(opts.title)

    btnClose = $(box.find(".sc-alert-close"))
    btnClose.on 'click', ->
      $('body').css {'overflow': ''}
      $(this).closest('.sc-alert').remove()

    # buttons
    opts.buttons ||= [{}]
    for button in opts.buttons
      btn = $(@templates.button).appendTo(box.find(".sc-alert-buttons"))
      btn.text(button.label || 'OK')
      btn.addClass("sc-btn-#{button.color || 'gray'}")
      btn.data('action', button.action) if button.action

      url = button.url || button.href
      btn.attr('href', url) if url

      target = button.target
      btn.attr('target', target) if target

      btn.on 'click', ->
        bt = $(this)
        action = bt.data 'action'
        action() if action

        # close
        $('body').css {'overflow': ''}
        bt.closest('.sc-alert').remove()


    # messages
    if opts.messages
      if typeof(opts.messages) == "string"
        opts.messages = [opts.messages]
      for message in opts.messages
        msg = $(@templates.message).appendTo(box.find(".sc-alert-messages"))
        msg.html(message)

    # open
    setTimeout (=>
      box.addClass("active")
    ), 100
    return
  _initCloseOnEsc:
    $('body').keyup (e) ->
      if e.which == 27
        boxJqScAlert = $('.jq-sc-alert')
        if boxJqScAlert.length
          boxJqScAlert.remove()
@configInputCidade = (inputCidade) ->
  boxEndereco = inputCidade.closest('.campos_endereco').presence()
  unless boxEndereco
    alert('Erro de desenvolvimento: Os campos de endereço devem estar dentro de uma div com class "campos_endereco" ')
  # return unless inputCidade
  inputName = "#{inputCidade.data('input-name')}"

  cidade = inputCidade.data('current-value')
  ajustarFormEnderecoPais(boxEndereco, cidade)

  inputCidade.autocompleteApp({
    onChange: (cidade)->
      ajustarFormEnderecoPais(boxEndereco, cidade)
    dataAs:
      title: 'nome_completo'
      value: 'id'
    className: 'cidade-autocomplete-app'
    placeholder: commonsLocale?.labels?.cidade || 'Cidade'
    name: inputName
    value: cidade
    minCharLength: 2
    url: "/support/regions/cities"
  });


@ajustarFormEnderecoPais = (box, cidade) ->
  return unless cidade
  hasConfig = cidade?.config?.has
  for campo, has of hasConfig
    input = box.find("input.#{campo}")
    inputBox = input.closest('.label_app').presence() || input.closest('div').presence()
    if has
      inputBox.slideDown('fast')
    else
      inputBox.slideUp('fast')
      input.val('')

@preencherEndereco = (container, cep) ->
  $this = container
  valor = cep
  if valor.replace(' ', '').match(/^\d{5}\-\d{3}/)
    # expressão regular que verifica cep
    jQuery.data document.body, 'cep', valor
    #salva o valor
    $.getJSON '/support/regions/addresses?cep=' + valor, (data) ->
      if data
        box = $this.parents('.campos_endereco')
        box.find('.logradouro').val(data.logradouro).trigger 'change'
        box.find('.bairro').val(data.bairro).trigger 'change'

        # cidade, estado e país
        comboCidade = box.find('.cidade-autocomplete')
        if comboCidade.length > 0
          comboCidade.comboAppSetValue data.cidade
      return
  return


@informNativeAppModaIsOpened = (boolean) ->
  try
    # ios
    window.webkit.messageHandlers.erpWebViewModalIsOpened.postMessage(boolean)
  catch err
    # console.log boolean

  try
    # android
    android.erpWebViewModalIsOpened(boolean)
  catch err
    # console.log currentPath()

@informNativeAppUrlChanged = ->
  try
    # ios
    window.webkit.messageHandlers.erpWebViewUrlChanged.postMessage(currentPath())
  catch err
    # console.log currentPath()

  try
    # android
    android.erpWebViewUrlChanged(currentPath())
  catch err
    # console.log currentPath()

@googleAnalyticsAssinc = (url) ->
  # googleAnalyticsAssinc()
  # ou
  # googleAnalyticsAssinc("/teste.php")
  return if typeof gtag == 'undefined'

  url ||= document.location.pathname
  gtag('config', 'UA-27009178-1', {'page_path': url})

  userId = currentUser()?.id
  gtag('set', {'user_id': userId}) if userId

@montarComboResidencias = (opt) ->
  # options aqui
  combos = opt.combo
  onChange = opt.onChange or ->
  placeholder = opt.placeholder or 'Selecione o Apartamento / Casa'
  # implementacao
  combo = undefined
  combos.each ->
    combo = $(this)
    atributos = combo.attr('data-combo-lares').toJson()
    name = atributos.name
    value = atributos.value
    combo.comboApp
      placeholderTooltip: false
      placeholder: placeholder
      value: value
      name: name
      onChange: (currentObj, combo, event) ->
        onChange currentObj, combo, event
        return
    return
  return

@timeago = (time) ->
  # time no formato 2013-01-12 13:30:50 ou um parecido
  # return "<abbr class='timeago' title='"+time+"'></abbr>"
  '<time class="timeago" datetime="' + time + '"></time>'

@pushHistoryObj = (historyObj) ->
  history.replaceState historyObj
  return

@nosContrate = ->
  urlAbrirForm = '/nos_contrate'
  lbox
    title: 'Entraremos em Contato com Você'
    url: urlAbrirForm
    beforeSubmit: (form, submitButton) ->
      inputTelefone = form.find('.telefone')
      inputNome = form.find('.nome')
      inputEmail = form.find('.email')
      telefone = inputTelefone.val()
      email = inputEmail.val()
      nome = inputNome.val()
      validacao = true
      inputNome.removeClass 'erro'
      inputTelefone.removeClass 'erro'
      inputEmail.removeClass 'erro'
      if email and email.isValidEmail() == false
        inputEmail.addClass 'erro'
        validacao = false
      if !nome
        inputNome.addClass 'erro'
        validacao = false
      if !telefone and !email
        if !telefone
          inputTelefone.addClass 'erro'
        if !email
          inputEmail.addClass 'erro'
        validacao = false
      validacao
    submitSuccess: (data, form, submitButton) ->
      googleAnalyticsAssinc '/cadastrar_nos_contrate'
      lbox
        title: 'Muito Obrigado'
        content: '<div class=\'sucesso_nos_contrate\'>Entraremos em Contato com você em no máximo 24hs</div>'
      return
    onClose: (event) ->
  return

@currentHost = ->
  document.location.host

@currentPath = ->
  # retorna a mesma coisa do currentUrl porém sem o dominio (query string vem também)
  window.location.pathname + window.location.search

@currentUrl = ->
  document.URL

@carregarLibLoginFacebookEIniciarAPPSEUCONDOMINIO = ->
  id = undefined
  js = undefined
  ref = undefined
  js = undefined
  id = 'facebook-jssdk'
  ref = document.getElementsByTagName('script')[0]
  if document.getElementById(id)
    return
  js = document.createElement('script')
  js.id = id
  js.async = true
  js.src = '//connect.facebook.net/en_US/all.js'
  # js.src = "//connect.facebook.net/pt_BR/all.js";
  ref.parentNode.insertBefore js, ref
  # escuta que executa quando termina de baixar e executar os arquivos

  window.fbAsyncInit = ->
    FB.init
      appId: $('body').attr('data-facebook-app')
      status: true
      cookie: true
      xfbml: true

  return

@focar_primeiro_campo = (div) ->
  if isTouchable() == false
    # n deixa focar para não abrir o teclado do ipad e celular (pode ser um pouco invasivo deixa isso como padrão por enquanto)
    div.find('input[type="text"]:visible').not('.ignore_autofocus, .data, .hora').eq(0).focus()
  return

@checkCssLoaded = (file) ->
  loadedCss = $('body').data('loadedCss') || []
  in_array(file, loadedCss)

@addCssFileToLoadedList = (file) ->
  return if checkCssLoaded(file)

  loadedCss = $('body').data('loadedCss') || []
  loadedCss.push file

  $('body').data 'loadedCss', loadedCss

  return

@loadCssAndJs = (arquivosCSS, arquivosJS, onComplete) ->
  enableBodyLoading()
  showBodyLoading()

  escopoDaFuncao = this
  escopoDaFuncao.loadedJs  = false
  escopoDaFuncao.loadedCss = false
  escopoDaFuncao.executouOnComplete = false
  # impede que execute o onComplete duas vezes sabe se lá porque (raramente acontece mas acontece, fazendo disparar esse método seguinte duas vezes -> dispararEventoJsDesseController(arquivosJS);)

  onAllFilesProcessed = ->
    # execultar somente quando o 'js' e 'css' estiver carregado
    return unless escopoDaFuncao.loadedJs && escopoDaFuncao.loadedCss

    # garantindo que está função será execultada somente uma(1) fez
    return if escopoDaFuncao.executouOnComplete
    escopoDaFuncao.executouOnComplete = true

    setTimeout (->
      # setTimout para garantir que o css e js foram carregados e dispararam os eventos caso existam
      # trace(88)
      onComplete?()
      hideBodyLoading()
    ), 100


  loadCss arquivosCSS, ->
    escopoDaFuncao.loadedCss = true
    onAllFilesProcessed()

  loadJs arquivosJS, ->
    escopoDaFuncao.loadedJs = true
    onAllFilesProcessed()


@loadCss = (files, onComplete) ->
  # flat().filter(String) => flattenCompact()
  files = [files].flatten().filter(String)
  return onComplete?() if Object.blank(files)

  allLoaded = undefined
  totalFilesCheckedOrLoaded = 0

  otherFileWasCheckedOrLoaded = ->
    totalFilesCheckedOrLoaded++
    allLoaded = files.length == totalFilesCheckedOrLoaded
    onComplete?() if allLoaded == true

  for file in files
    if checkCssLoaded(file)
      otherFileWasCheckedOrLoaded()
      continue

    addCssFileToLoadedList file
    yepnope [
      load: file
      complete: () ->
        otherFileWasCheckedOrLoaded()
    ]


@dispararEventoJsDesseController = (arquivoJS) ->
  arquivoSemExtensao = arquivoJS.replace(/.js|.coffee/g, '')
  nomeDoEvento = 'nomeEventoJsDesseController:' + arquivoSemExtensao
  trigger = ->
    $('body').trigger nomeDoEvento
  scPageSystem.updatePageSettingsFromServer(currentUrl(), trigger) if scPageSystem?
  return

@loadJs = (files, onComplete) ->
  # flat().filter(String) => flattenCompact()
  files = [files].flatten().filter(String)
  return onComplete?() if Object.blank(files)

  $script files, ->
    onComplete?()

  return

@prepareToKeyupSearch = (opt) ->
  e = opt.event
  input = $(e.target)
  onSearch = opt.onSearch
  delay = opt.delay or 500
  $this = input
  textBusca = input.val()
  keyDownPressed = e.keyCode == 40
  keyUpPressed = e.keyCode == 38
  tabPressed = e.keyCode == 9
  shiftPressed = e.keyCode == 16
  arrowPressed = keyDownPressed or keyUpPressed or e.keyCode == 37 or e.keyCode == 39
  buscar = !tabPressed and !shiftPressed and !arrowPressed and $this.lastSearch != textBusca
  if buscar
    $this.lastSearch = textBusca
    clearTimeout @contagem_regressiva_busca
    @contagem_regressiva_busca = setTimeout((->
      onSearch.call()
      return
    ), delay)
  return

@placeholderToTooltip = (selectorString) ->
  $('body').on 'focus', selectorString, ->
    input = $(this)
    if input.val()
      input.showTooltip input.attr('placeholder'), color: '#000'
    return
  $('body').on 'mouseenter', selectorString, ->
    input = $(this)
    if input.val()
      input.showTooltip input.attr('placeholder'), color: '#000'
    else
      # input.hideTooltip();
    return
  $('body').on 'mouseleave', selectorString + ':not(:focus)', ->
    input = $(this)
    if input.val()
      input.hideTooltip()
    else
    return
  $('body').on 'keyup', selectorString, ->
    input = $(this)
    if input.val()
      input.showTooltip input.attr('placeholder'), color: '#000'
    else
      input.hideTooltip()
    return
  $('body').on 'blur', selectorString, ->
    input = $(this)
    input.hideTooltip()
    return
  return

# Quando clica no botao voltar do browser
if window.addEventListener
  window.setTimeout (->
    # esse timeout evita que o primeiro historico gerado pelo navegacaoMenuSite e erpPageSinc não disparem instantaneamente e caiam em um loop infinito (erp) ou carregue duas vezes a página (site)
    # history
    window.addEventListener 'popstate', (event) ->
      if typeof event.state == 'object'
        data = event.state
        url = undefined
        if data
          if data.tipo == 'navegacaoMenuSite'
            url = data.url
            if url
              loadSitePage
                url: data.url
                gerarHistorico: false
          if data.tipo == 'erpPageSinc'
            url = data.url
            if url
              redirectTo data.url
          if data.tipo == 'loadErpPage'
            url = data.url
            if url
              loadErpPage
                url: data.url
                gerarHistorico: false
          if data.tipo == 'mudarMesDoErp'
            mes_antigo = data.mes_antigo
            mes_novo = data.mes_novo
            if mes_antigo and mes_novo
              mudarMesSistema mes_antigo, mes_novo, gerarHistorico: false
      return
    return
  ), 5000
# var checarSeDispositivoPermiteTooltip = function(){
#   var n_for_mobile_e_for_webkit_mozilla_e_a_partir_ieca9 = !isMobile.any() && !myBrowser.ie7() && !myBrowser.ie8();
#   return n_for_mobile_e_for_webkit_mozilla_e_a_partir_ieca9;
# }
@globalEscopeSeuCondominio = this
jQuery(document).ready ->
  @scNetwork = globalEscopeSeuCondominio.scNetwork


  globalEscopeSeuCondominio.jqCheckboxShiftSelect =
    # How to use (tela de encomendas tem um exemplo)
    # jqCheckboxShiftSelect.init
    #   checkAll: '.encomendas-check-all' # não obrigatório
    #   item: '.encomenda-checkbox' # obrigatório
    lastChecked: null
    init: (params={}) ->
      itemSelector = params.item
      itemCheckAll = params.checkAll

      if itemCheckAll
        $('body').on 'click', itemCheckAll, (e)->
          checked = $(this).prop('checked')
          $(itemSelector).prop('checked', checked)

      if itemSelector
        ctrls = {}
        ctrls[itemSelector] =
          lastChecked: null

        $('body').on 'click', itemSelector, (e) ->
          ctrl = ctrls[itemSelector]
          chkboxes = $(itemSelector)

          if !ctrl.lastChecked
            ctrl.lastChecked = this
            return
          if e.shiftKey
            start = chkboxes.index(this)
            end = chkboxes.index(ctrl.lastChecked)
            chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop 'checked', ctrl.lastChecked.checked
          ctrl.lastChecked = this

          if itemCheckAll
            check =  chkboxes.length == chkboxes.filter(':checked').length
            $(itemCheckAll).prop('checked', check)


  # $("body").on "click", 'a', ->
  #     # quando implementar no iOS retirar o 'if' do Android
  #     # pesquise também por 'informNativeAppUrlChanged' e retire a chamada deste comando de app/assets/javascripts/sc-page-system.coffee
  #     setTimeout((->
  #       # console.log currentPath()
  #       informNativeAppUrlChanged() if isMobile.Android()
  #     ), 250)


  globalEscopeSeuCondominio.aoChamarJsDesseController = (callback) ->
    # callback();
    cssEJs = $('.load-assinc-js-and-css').data('load-assinc-js-and-css')
    if cssEJs and cssEJs.js
      arquivoJsSemExtensao = cssEJs.js.replace(/.js|.coffee/g, '')
      # var arquivoJsSemExtensao = asset_path(arquivo).replace(/.js|.coffee/g, '')
      nomeDoEvento = 'nomeEventoJsDesseController:' + arquivoJsSemExtensao
      $('body').on nomeDoEvento, ->
        callback()
        return
    return

  # if(isMobile.iOS()) {
  # placeholderToTooltip("[placeholder]:not(textarea, .disable-placeholder-to-tooltip)");
  placeholderToTooltip '.placeholder-to-tooltip[placeholder]'
  # }
  #
  $.ajaxSetup
    beforeSend: (xhr, settings) =>
      showBodyLoading()
      xhr.setRequestHeader 'X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')
      xhr.setRequestHeader 'SC-XIP', @scNetwork.ipClient
      device_id = currentUrl().getUrlParam("device_id")
      settings.data.append?('device_id', device_id) if device_id && settings.data # formadata
      return true
    complete: (xhr, status) ->
      # se for sobrescrever o complete:, nao esqueça de inserir o comando hideBodyLoading();
      # se não fizer isso ele vai ficar ativo mesmo quando a req. terminar
      hideBodyLoading()
      return
    error: (XMLHttpRequest, textStatus, errorThrown) ->
      if myBrowser.ie() == false
        trace 'Debug do ERRO Ajax Setup:'
        trace XMLHttpRequest
        trace textStatus
        trace errorThrown
      # if(textStatus === "abort") alert("Clicou em um botão SINCRONO enquanto existia uma requisição ajax em.... OU 500 Internal Server Error")
      if errorThrown == 'Internal Server Error'
        $.avisar '500 Internal Server Error (dentro de uma req. assíncrona)', tema: 'erro'
      return

  jQuery.fn.swapPlaceWith = (to) ->
    # troca o elemento de lugar com outro
    # Como usar?
    # $("div:eq(0)").swapWith("div:eq(1)");
    @each ->
      copy_to = $(to).clone(true)
      copy_from = $(this).clone(true)
      $(to).replaceWith copy_from
      $(this).replaceWith copy_to
      return

  jQuery.fn.visible = ->
    @css 'visibility', 'visible'

  jQuery.fn.invisible = ->
    @css 'visibility', 'hidden'

  jQuery.fn.visibilityToggle = ->
    @css 'visibility', (i, visibility) ->
      if visibility == 'visible' then 'hidden' else 'visible'

  # remove o loading

  $.fn.stopLoadingNaoResponsivo = (opt) ->
    @each ->
      container = $(this)
      container.find('.loading_app').remove()
      enableBodyLoading()
      container.removeClass 'on_loading'
      if container.hasClass('bot-retangulo')
        container.find('.icone_botao').visible()
      return
    return

  # insere o loading

  $.fn.startLoadingNaoResponsivo = (opt) ->
    # size: "mini", "smaller", "small", "medium", "large"
    # color: "#FFF"
    # shadow: true ou false
    # center: false ou true (centraliza o loader na div)
    # centerX: false ou true
    # centerY: false ou true
    # x: 20
    # y: 30
    # position: absolute ou relative (absolute é melhor para responsivo pois aceita % e em)
    if !opt
      opt = {}
    @each ->
      if !opt.position
        opt.position = 'relative'
      container = $(this)
      lines = undefined
      length = undefined
      width = undefined
      radius = undefined
      top = undefined
      left = undefined
      if container.hasClass('bot-retangulo')
        if !opt.size
          opt.size = 'mini'
        container.find('.icone_botao').invisible()
      if container.hasClass('head_top')
        if !opt.center
          opt.center = true
        if !opt.shadow
          opt.shadow = true
        # alert(opt.center)
      if opt.size == 'mini'
        lines = 9
        length = 4
        width = 2
        radius = 1
      if opt.size == 'smaller'
        lines = 9
        length = 6
        width = 3
        radius = 2
      if opt.size == 'small'
        lines = 11
        length = 8
        width = 4
        radius = 5
      if opt.size == 'medium'
        lines = 13
        length = 12
        width = 6
        radius = 10
      if opt.size == 'large'
        lines = 13
        length = 18
        width = 9
        radius = 16
      if opt.center == true
        left = 'auto'
        top = 'auto'
      if opt.centerX == true
        left = 'auto'
      if opt.centerY == true
        top = 'auto'
      if !left
        left = opt.x or null
      if !top
        top = opt.y or null
      spinConfig =
        position: opt.position
        lines: lines
        length: length
        width: width
        radius: radius
        corners: 1
        rotate: 0
        color: opt.color or '#FFF'
        speed: 2.2
        trail: 54
        shadow: opt.shadow or false
        hwaccel: false
        className: 'loading_app' or opt.className
        zIndex: 2e9
        left: left
        top: top
      container.addClass 'on_loading'
      botao = container.get(0)
      spinner = new Spinner(spinConfig).spin(botao)
      disableBodyLoading()
      return
    return

  $.fn.prevVisible = ->
    @prevAll ':visible:first'

  $.fn.nextVisible = ->
    @nextAll ':visible:first'

  $.fn.hasVal = ->
    @val().length > 0

  $.fn.horizontal_center = ->
    @css 'position', 'absolute'
    @css 'left', ($(window).width() - @outerWidth()) / 2 + $(window).scrollLeft() + 'px'
    this

  $.fn.vertical_center = ->
    @css 'left', ($(window).width() - @outerWidth()) / 2 + $(window).scrollLeft() + 'px'
    this

  $.fn.extend center: ->
    @each ->
      top = ($(window).height() - $(this).outerHeight()) / 2
      left = ($(window).width() - $(this).outerWidth()) / 2
      $(this).css
        position: 'absolute'
        margin: 0
        top: (if top > 0 then top else 0) + 'px'
        left: (if left > 0 then left else 0) + 'px'
      return

  ### Limitador de Caracteres ###

  $.fn.textLimit = (limit, callback) ->
    `var callback`
    if typeof callback != 'function'

      callback = ->

    @each ->
      @limit = limit
      @callback = callback
      @onkeydown =
      @onkeyup = (e) ->
        `var limite`
        keyCode = e.keyCode
        @reached = @limit - (@value.length)
        @reached = if @reached <= 0 then true else false
        if keyCode != 9 and keyCode != 18 and keyCode != 16 and keyCode != 33 and keyCode != 34 and keyCode != 35 and keyCode != 36 and keyCode != 37 and keyCode != 38 and keyCode != 39 and keyCode != 40 and keyCode != 45 and keyCode != 46
          if @reached
            @value = @value.substr(0, @limit)
        limite = @limit
        qtdAtual = @value.length
        limite = @limit
        qtdFaltando = limite - qtdAtual
        @callback qtdFaltando, qtdAtual, limite, @reached

      return

  $('body').on 'click', '.mais_multiplos_filhos', ->
    $this = $(this)
    if !$this.hasClass('desabilitado')
      adicionar_em = $this.data('div_target')
      callback = $this.data('_callback')
      if !$this.data('_elemento_multiplos_filhos')
        $.ajax
          type: 'POST'
          url: '/js/mais'
          data:
            'model': $this.data('_model')
            'locals': $this.data('_locals')
          success: (data) ->
            data = data.trim()
            $this.data '_elemento_multiplos_filhos', data
            #salva o ajax em uma variável
            elemento_novo = $($this.data('_elemento_multiplos_filhos')).appendTo(adicionar_em).css('display', 'none').slideDown('fast')
            $(elemento_novo).brilhar()
            if callback
              eval callback
            if $this.data('focar_prim_campo') == true
              focar_primeiro_campo $(adicionar_em + ' > div:last')
            elemento_novo.trigger 'adicionado'
            return
      else
        elemento_novo = $($this.data('_elemento_multiplos_filhos')).appendTo(adicionar_em).css('display', 'none').slideDown('fast')
        $(elemento_novo).brilhar()
        if callback
          eval callback
        elemento_novo.trigger 'adicionado'
      if $this.data('focar_prim_campo') == true
        focar_primeiro_campo $(adicionar_em + ' > div:last')
    false
  return
#Plugins
(($) ->

  $.fn.presence = ->
    $this = $(this)
    if $this.length > 0
      $this
    else
      null

  $.fn.overflowingBottom = ->
    `var ax`
    elemento = $(this)
    elemento_bot = elemento.offset().top + elemento.outerHeight()
    screen_bottom = $('html').offset().top * -1 + $(window).height()
    if elemento_bot > screen_bottom
      ax = true
    else
      ax = false
    ax

  $.fn.overflowingTop = ->
    `var ax`
    elemento = $(this)
    elemento_top = elemento.offset().top
    screen_top = $('html').offset().top * -1
    if elemento_top > screen_top
      ax = false
    else
      ax = true
    ax

  $.fn.overflowingRight = ->
    elemento = $(this)
    tamanho_tela = $(window).width()
    elemento_right = elemento.getRight()
    resultado = undefined
    if elemento_right > tamanho_tela
      resultado = true
    else
      resultado = false
    resultado

  $.fn.getLeft = ->
    elemento = $(this)
    elemento.offset().left

  $.fn.getRight = ->
    elemento = $(this)
    elemento.offset().left + elemento.outerWidth()

  $.fn.getTop = ->
    elemento = $(this)
    if elemento.offset().top - elemento.outerHeight() >= 0
      elemento.offset().top + elemento.outerHeight()
    else
      elemento.offset().top

  $('body').find('ul.menu_dropdown li > a').on 'mousedown', (e) ->
    $this = $(this)
    dropdown = $this.parents('.dropdown')
    leftMouseButton = isLeftButton(e)
    alvo = dropdown.data('alvo')
    if leftMouseButton == false
      alvo.dropdown 'close'
    return

  $.fn.hideTooltip = ->
    @each ->
      alvo = $(this)
      tooltip = alvo.data('myTooltip')
      if tooltip
        tooltip.hide()
      return

  $.fn.showTooltip = (text, opt) ->
    # Opções
    # default
    # opt.color = "black"... pode ser red ou qualquer outra
    if !opt
      opt = {}
    color = opt.color or 'black'
    @each ->
      `var tooltip`
      alvo = $(this)
      if alvo.data('myTooltip')
        tooltip = alvo.data('myTooltip')
        # var tooltip = this.tooltipApp;
      else
        tooltip = $('<span class="tooltip"><span class="tooltip_text"></span><span class="seta_tooltip"></span></span>').appendTo($('body'))
        # this.tooltipApp = tooltip;
        alvo.data 'myTooltip', tooltip
      if text and text != ''
        textTooltip = tooltip.find('.tooltip_text')
        setaTooltip = tooltip.find('.seta_tooltip')
        textTooltip.css 'background-color': color
        setaTooltip.css 'border-top-color': color
        pos_alvo = alvo.offset()
        width = alvo.width()
        left_alvo = pos_alvo.left
        top_alvo = pos_alvo.top
        textTooltip.text text
        height_tooltip = tooltip.height()
        tooltip.css 'left', left_alvo
        tooltip.css 'top', top_alvo - (height_tooltip + 5)
        tooltip.stop(true, true).fadeIn 150
        # if(opt.closeAfter){
        #   var seconds = opt.closeAfter;
        #   tooltip.showAndHideAfter(seconds);
        # }
      return

  $.fn.showAndHideAfter = (seconds) ->
    alvo = $(this)
    alvo.show()
    if @timeOut
      clearTimeout @timeOut
    @timeOut = setTimeout((->
      alvo.fadeOut 500
      return
    ), seconds * 1000)
    return

  $.fn.tooltip = (text, options) ->
    # if(checarSeDispositivoPermiteTooltip()){
    if isTouchable() == false
      # Opções
      opt = teste: 1
      if options
        $.extend opt, options
      # merge de options
      tooltip = $('span.tooltip')
      return @each(->
        alvo = $(this)
        # var alvo_com_hover = alvo.filter(":hover");
        alvo.data 'text', text
        texto = alvo.data('text')
        alvo.addClass 'tem_tooltip'
        # if(alvo_com_hover.length > 0) alvo.showTooltip(texto);
        return
      )
    return

  $('body').on 'mouseenter', '.tem_tooltip', ->
    alvo = $(this)
    texto = alvo.data('text')
    alvo.showTooltip texto
    return
  $('body').on 'mouseleave', '.tem_tooltip', ->
    $(this).hideTooltip()
    return

  $('.has_tooltip, *[data-tooltip]').livequery ->
    # if(checarSeDispositivoPermiteTooltip()){
    if isTouchable() == false
      $this = $(this)
      text = $this.attr('title') or $this.attr('tooltip') or $this.data('title') or $this.attr('data-tooltip')
      is_fancybox = $this.hasClass('fancybox_image')
      if $this.attr('title')
        $this.data 'title', text
        $this.attr 'data-tooltip', null
        if is_fancybox == false
          $this.removeAttr 'title'
      $this.tooltip text
    return
  if myBrowser.ie7() or myBrowser.ie8() or myBrowser.ie9()
    $('input, textarea').livequery ->
      # .placeholder() é um método do arquivo  placeholders-ie9-polyfills.min.js
      $(this).placeholder()
      return
  $('.timeago').livequery ->
    # alert()
    $(this).timeago()
    $(this).removeAttr 'title'
    $(this).fadeIn 'fast'
    return

  ### Outros ###

  $.fn.slideFadeHide = (speed, callback) ->
    if !speed
      speed = 500
    @css(
      overflow: 'hidden'
      display: 'block').animate({
      height: '0px'
      opacity: 0.2
    }, speed, 'swing', ->
      if callback
        callback()
      return
    ).delay 5000

  $.fn.capturar_botao_fechar_dialog = (options) ->
    $this = $(this)
    caixa_dialog = $this.parents('.ui-dialog')
    caixa_dialog.find '.ui-dialog-titlebar-close'

  $.fn.equals = (compareTo) ->
    if !compareTo or @length != compareTo.length
      return false
    i = 0
    while i < @length
      if @[i] != compareTo[i]
        return false
      ++i
    true

  $.fn.focar_input = (options) ->
    $this = $(this)
    # Opções
    opt =
      type: 'text'
      posicao_input: 0
    if options
      $.extend opt, options
    # merge de options
    $this.find('input[type=' + opt.type + ']:not(.desabilitado)').eq(opt.posicao_input).focus()
    return

  $.fn.mudar_posicao_random = (options) ->
    # Opções
    opt = 'intervalo': 35
    if options
      $.extend opt, options
    # merge de options
    $this = $(this)
    posicao_elemento = $this.offset()
    sinais = [
      1
      -1
    ]
    random_left = Math.floor(Math.random() * opt.intervalo + 1)
    random_top = Math.floor(Math.random() * opt.intervalo + 1)
    sinal_left = sinais[Math.floor(Math.random() * sinais.length)]
    # -1 ou 1
    sinal_top = sinais[Math.floor(Math.random() * sinais.length)]
    # -1 ou 1
    pos_left = posicao_elemento.left + random_left * sinal_left
    pos_top = posicao_elemento.top + random_top * sinal_top
    $this.offset
      top: pos_top
      left: pos_left
    return

  $.fn.preencherDatasDeVariosPagamentosIncrementandoMes = (data, options) ->
    # Opções
    opt = 'sobreescrever': true
    if options
      $.extend opt, options
    # merge de options
    $this = $(this)
    $this.each (index, ipt) ->
      input = $(ipt)
      if input.val() == '' or opt.sobreescrever == true
        input.val(arrumar_data_estourada(data)).trigger 'change'
      data = incrementar_mes(data)
      return
    return

  $.fn.esperar = (time, callback) ->
    # Empty function:

    jQuery.fx.step.delay = ->

    # Return meaningless animation, (will be added to queue)
    @animate { delay: 1 }, time, callback

  $.fn.brilhar = (options) ->
    # Opções
    opt =
      'tempo_animacao': 1
      'esperar': 0
    if options
      $.extend opt, options
    # merge de options
    $this = $(this)
    $this.stop(true, true).esperar(opt.esperar * 1000).effect 'highlight', {}, opt.tempo_animacao * 1000
    return

  # Avisos do sistema

  $.avisar = (mensagem, options) ->
    # Opções
    opt =
      'tempo': true
      'tema': false
    if options
      $.extend opt, options
    # merge de options
    # A implementação começa a partir daqui
    if opt.tema
      $.jGrowl.defaults.theme = opt.tema
    else
      $.jGrowl.defaults.theme = 'default'
    if opt.tempo == 0
      $.jGrowl mensagem, sticky: true
    else if opt.tempo == true
      $.jGrowl mensagem, life: 4 * 1000
    else
      $.jGrowl mensagem, life: opt.tempo * 1000
    return

  # Accordion

  $.fn.accordionFino = (options) ->
    $this = $(this)
    #esse é o elemento pai $("#element")
    # Opções
    opt =
      'abrir_todos': 'false'
      'clicar': 'true'
    if options
      $.extend opt, options
    # merge de options
    #A implementação começa a partir daqui
    $this.children().each (index) ->
      div_item_acc = $(this)
      div_item_acc.addClass 'accordion_gc'
      div_item_acc.children().eq(0).addClass 'titulo_acc'
      div_item_acc.children().eq(1).addClass 'conteudo'
      return
    if opt.abrir_todos
      $this.find('.conteudo').show()
    else
      $this.find('.conteudo').hide()
      $this.find('.accordion_gc:first .conteudo').show()
    if opt.clicar
      $this.find('.titulo_acc').css 'cursor', 'pointer'
      $this.find('.titulo_acc').click (event) ->
        alvo = $(event.target)
        propagar = !alvo.parents('.sem_propagacao_click').size() > 0
        if propagar
          #ao clicar no que tem esse class o accordion não abrirá ou fechará
          conteudo = $(this).parent().find('.conteudo')
          if conteudo.css('display') != 'none'
            conteudo.slideUp 'fast'
          else
            conteudo.slideDown 'fast'
        return
    return

  # Input somente numericos

  jQuery.fn.numerico = (options) ->
    # Opções
    opt =
      'virgula': false
      'hifen': false
    if options
      $.extend opt, options
    # merge de options
    # A implementação começa a partir daqui
    @each ->
      $(this).keydown (e) ->
        key = e.charCode or e.keyCode or 0
        # allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
        key == 13 or key == 8 or key == 9 or key == 46 or key >= 37 and key <= 40 or key >= 48 and key <= 57 or opt.virgula and key == 188 or opt.hifen and (key == 189 or key == 109) or key >= 96 and key <= 105
      return

  # Desabilita campos de form

  jQuery.fn.desabilitar_campo = (options) ->
    $this = $(this)
    # Opções
    opt =
      'manter_valor': false
      'readonly': false
    if options
      $.extend opt, options
    # merge de options
    if opt.valor_ini != undefined
      opt.manter_valor = opt.valor_ini
    $this.datepicker 'disable'
    # A implementação começa a partir daqui
    if opt.manter_valor == false
      $this.val ''
    if opt.readonly
      $this.attr 'readonly', true
      $this.attr 'disabled', false
    else
      $this.attr 'disabled', true
    $this.addClass 'desabilitado'
    return

  # Habilita campos de form

  jQuery.fn.habilitar_campo = (options) ->
    $this = $(this)
    # Opções
    opt = 'teste': 0.5
    if options
      $.extend opt, options
    # merge de options
    # A implementação começa a partir daqui
    $this.removeAttr 'disabled'
    $this.removeAttr 'readonly'
    $this.removeClass 'desabilitado'
    $this.datepicker 'enable'
    return

  # Desabilita ítens

  jQuery.fn.desabilitar = (options) ->
    $this = $(this)
    # Opções
    opt = 'opacity': 0.5
    if options
      $.extend opt, options
    # merge de options
    # A implementação começa a partir daqui
    $this.animate { opacity: opt.opacity }, 700, ->
      $(this).addClass 'desabilitado'
      return
    return

  jQuery.fn.habilitar = (options) ->
    $this = $(this)
    # Opções
    opt = 'opacity': 1
    if options
      $.extend opt, options
    # merge de options
    # A implementação começa a partir daqui
    $this.animate { opacity: opt.opacity }, 350, ->
      $(this).removeClass 'desabilitado'
      return
    return

  #Slide left
  jQuery.fn.extend
    slideRightShow: ->
      @each ->
        $(this).show 'slide', { direction: 'right' }, 100
        return
    slideLeftHide: ->
      @each ->
        $(this).hide 'slide', { direction: 'left' }, 100
        return
    slideRightHide: ->
      @each ->
        $(this).hide 'slide', { direction: 'right' }, 100
        return
    slideLeftShow: (options) ->
      opt = time: 100
      if options
        $.extend opt, options
      @each ->
        $(this).show 'slide', { direction: 'left' }, opt.time
        return
  return
) jQuery

