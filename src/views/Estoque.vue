<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">

        <section class="page-header">
            <h3 class="script">Gestão de</h3>
            <h1 class="page-title">ESTOQUE</h1>
        </section>

        <div v-if="loading" class="loading">
            <i class="fa-solid fa-spinner fa-spin"></i> Carregando...
        </div>

        <template v-else>

            <template v-if="role === 'admin'">
                <div class="tabs">
                    <button :class="['tab', { active: tabAdmin === 'epis' }]" @click="tabAdmin = 'epis'">
                        <i class="fa-solid fa-boxes-stacked"></i> EPIs
                    </button>
                    <button :class="['tab', { active: tabAdmin === 'solicitacoes' }]"
                        @click="tabAdmin = 'solicitacoes'">
                        <i class="fa-solid fa-clock-rotate-left"></i> Solicitações
                    </button>
                </div>

                <div v-if="tabAdmin === 'epis'">
                    <div class="section-header">
                        <h2 class="section-title">EPIs cadastrados</h2>
                        <button class="btn-primary" @click="abrirModalNovoEpi">
                            <i class="fa-solid fa-plus"></i> Novo EPI
                        </button>
                    </div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Quantidade</th>
                                    <th>Disponível</th>
                                    <th>Validade</th>
                                    <th>Patrimônio</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="epi in episPaginados" :key="epi.idepis">
                                    <td>{{ epi.nome }}</td>
                                    <td>{{ epi.tipo }}</td>
                                    <td>{{ epi.quantidade }}</td>
                                    <td><span :class="['badge', epi.disponivel ? 'badge-green' : 'badge-red']">{{
                                            epi.disponivel ? 'Sim' : 'Não' }}</span></td>
                                    <td>{{ formatDate(epi.data_validade) }}</td>
                                    <td>{{ epi.codigo_patrimonio }}</td>
                                    <td class="actions-cell">
                                        <button class="btn-icon" @click="abrirModalEditarEpi(epi)"><i
                                                class="fa-solid fa-pen"></i></button>
                                        <button class="btn-icon btn-danger" @click="deletarEpi(epi.idepis)"><i
                                                class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="cards-mobile">
                        <div v-for="epi in episPaginados" :key="epi.idepis" class="item-card">
                            <div class="item-card-header">
                                <span class="item-card-nome">{{ epi.nome }}</span>
                                <div class="actions-cell">
                                    <button class="btn-icon" @click="abrirModalEditarEpi(epi)"><i
                                            class="fa-solid fa-pen"></i></button>
                                    <button class="btn-icon btn-danger" @click="deletarEpi(epi.idepis)"><i
                                            class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                            <div class="item-card-row"><span class="item-card-label">Tipo</span><span>{{ epi.tipo
                                    }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Quantidade</span><span>{{
                                    epi.quantidade }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Disponível</span><span
                                    :class="['badge', epi.disponivel ? 'badge-green' : 'badge-red']">{{ epi.disponivel ?
                                    'Sim' : 'Não' }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Validade</span><span>{{
                                    formatDate(epi.data_validade) }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Patrimônio</span><span>{{
                                    epi.codigo_patrimonio || '—' }}</span></div>
                        </div>
                    </div>
                    <div class="paginacao" v-if="totalPaginasEpis > 1">
                        <button class="pag-btn" @click="paginaEpis--" :disabled="paginaEpis === 1"><i
                                class="fa-solid fa-chevron-left"></i></button>
                        <span class="pag-info">{{ paginaEpis }} / {{ totalPaginasEpis }}</span>
                        <button class="pag-btn" @click="paginaEpis++" :disabled="paginaEpis === totalPaginasEpis"><i
                                class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>

                <div v-if="tabAdmin === 'solicitacoes'">
                    <h2 class="section-title">Todas as solicitações</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Solicitante</th>
                                    <th>Tipo</th>
                                    <th>EPI</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in solicitacoesPaginadas" :key="s.id">
                                    <td>{{ s.solicitante }}</td>
                                    <td>{{ s.tipo_solicitante }}</td>
                                    <td>{{ s.epi_nome }}</td>
                                    <td>{{ formatDate(s.data) }}</td>
                                    <td><span :class="['badge', getBadgeStatus(s.status)]">{{ formatStatus(s.status)
                                            }}</span></td>
                                    <td class="actions-cell">
                                        <button v-if="s.status === 'pendente'" class="btn-icon btn-green"
                                            @click="aprovarSolicitacao(s)"><i class="fa-solid fa-check"></i></button>
                                        <button v-if="s.status === 'pendente'" class="btn-icon btn-danger"
                                            @click="rejeitarSolicitacao(s)"><i class="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>
                                <tr v-if="solicitacoes.length === 0">
                                    <td colspan="6" class="empty-row">Nenhuma solicitação encontrada.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="cards-mobile">
                        <div v-if="solicitacoes.length === 0" class="card-empty">Nenhuma solicitação encontrada.</div>
                        <div v-for="s in solicitacoesPaginadas" :key="s.id" class="item-card">
                            <div class="item-card-header">
                                <span class="item-card-nome">{{ s.solicitante }}</span>
                                <div class="actions-cell">
                                    <button v-if="s.status === 'pendente'" class="btn-icon btn-green"
                                        @click="aprovarSolicitacao(s)"><i class="fa-solid fa-check"></i></button>
                                    <button v-if="s.status === 'pendente'" class="btn-icon btn-danger"
                                        @click="rejeitarSolicitacao(s)"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                            <div class="item-card-row"><span class="item-card-label">Tipo</span><span>{{
                                    s.tipo_solicitante }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">EPI</span><span>{{ s.epi_nome
                                    }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Data</span><span>{{
                                    formatDate(s.data) }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Status</span><span
                                    :class="['badge', getBadgeStatus(s.status)]">{{ formatStatus(s.status) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="paginacao" v-if="totalPaginasSolicitacoes > 1">
                        <button class="pag-btn" @click="paginaSolicitacoes--" :disabled="paginaSolicitacoes === 1"><i
                                class="fa-solid fa-chevron-left"></i></button>
                        <span class="pag-info">{{ paginaSolicitacoes }} / {{ totalPaginasSolicitacoes }}</span>
                        <button class="pag-btn" @click="paginaSolicitacoes++"
                            :disabled="paginaSolicitacoes === totalPaginasSolicitacoes"><i
                                class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </template>

            <template v-else-if="role === 'docente'">
                <div class="tabs">
                    <button :class="['tab', { active: tabDocente === 'epis' }]" @click="tabDocente = 'epis'"><i
                            class="fa-solid fa-boxes-stacked"></i> EPIs disponíveis</button>
                    <button :class="['tab', { active: tabDocente === 'solicitacoes' }]"
                        @click="tabDocente = 'solicitacoes'"><i class="fa-solid fa-clock-rotate-left"></i> Solicitações
                        dos alunos</button>
                    <button :class="['tab', { active: tabDocente === 'minhas' }]" @click="tabDocente = 'minhas'"><i
                            class="fa-solid fa-user"></i> Minhas solicitações</button>
                </div>

                <div v-if="tabDocente === 'epis'">
                    <div class="section-header">
                        <h2 class="section-title">EPIs disponíveis</h2>
                        <button class="btn-primary" @click="abrirModalSolicitarLote"><i
                                class="fa-solid fa-layer-group"></i> Solicitar em lote</button>
                    </div>
                    <div class="filtros-bar">
                        <div class="filtro-search"><i class="fa-solid fa-magnifying-glass"></i><input
                                v-model="filtroNome" type="text" placeholder="Buscar EPIs..."></div>
                        <select v-model="filtroTipo">
                            <option value="">Todos os tipos</option>
                            <option v-for="tipo in tiposDisponiveis" :key="tipo" :value="tipo">{{ tipo }}</option>
                        </select>
                        <select v-model="filtroDisponibilidade">
                            <option value="">Todas as disponibilidades</option>
                            <option value="disponivel">Disponível</option>
                            <option value="baixo">Estoque baixo</option>
                        </select>
                    </div>
                    <div class="epis-grid">
                        <div class="epi-card" v-for="epi in episFiltrados" :key="epi.idepis">
                            <div class="epi-card-top">
                                <div class="epi-card-icon"><i :class="getIcone(epi)"></i></div>
                                <span :class="['stock-chip', epi.quantidade <= 5 ? 'chip-low' : 'chip-ok']">{{
                                    epi.quantidade }} un.</span>
                            </div>
                            <div class="epi-card-body">
                                <h3>{{ epi.nome }}</h3>
                                <p>{{ epi.tipo }}</p>
                            </div>
                            <div class="epi-stock-bar">
                                <div class="epi-stock-fill"
                                    :style="{ width: Math.min(100, (epi.quantidade / 100) * 100) + '%' }"></div>
                            </div>
                            <button class="btn-sm btn-full" @click="abrirModalSolicitar(epi, 'docente')"><i
                                    class="fa-solid fa-hand"></i> Solicitar</button>
                        </div>
                        <div v-if="episFiltrados.length === 0" class="filtro-empty">Nenhum EPI encontrado com esses
                            filtros.</div>
                    </div>
                </div>

                <div v-if="tabDocente === 'solicitacoes'">
                    <h2 class="section-title">Solicitações dos alunos</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>EPI</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in solicitacoesAlunos" :key="s.id">
                                    <td>{{ s.solicitante }}</td>
                                    <td>{{ s.epi_nome }}</td>
                                    <td>{{ formatDate(s.data) }}</td>
                                    <td><span :class="['badge', getBadgeStatus(s.status)]">{{ formatStatus(s.status)
                                            }}</span></td>
                                    <td class="actions-cell">
                                        <button v-if="s.status === 'pendente'" class="btn-icon btn-green"
                                            @click="aprovarSolicitacao(s)"><i class="fa-solid fa-check"></i></button>
                                        <button v-if="s.status === 'pendente'" class="btn-icon btn-danger"
                                            @click="rejeitarSolicitacao(s)"><i class="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>
                                <tr v-if="solicitacoesAlunos.length === 0">
                                    <td colspan="5" class="empty-row">Nenhuma solicitação de aluno.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="cards-mobile">
                        <div v-if="solicitacoesAlunos.length === 0" class="card-empty">Nenhuma solicitação de aluno.
                        </div>
                        <div v-for="s in solicitacoesAlunos" :key="s.id" class="item-card">
                            <div class="item-card-header">
                                <span class="item-card-nome">{{ s.solicitante }}</span>
                                <div class="actions-cell">
                                    <button v-if="s.status === 'pendente'" class="btn-icon btn-green"
                                        @click="aprovarSolicitacao(s)"><i class="fa-solid fa-check"></i></button>
                                    <button v-if="s.status === 'pendente'" class="btn-icon btn-danger"
                                        @click="rejeitarSolicitacao(s)"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                            <div class="item-card-row"><span class="item-card-label">EPI</span><span>{{ s.epi_nome
                                    }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Data</span><span>{{
                                    formatDate(s.data) }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Status</span><span
                                    :class="['badge', getBadgeStatus(s.status)]">{{ formatStatus(s.status) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="tabDocente === 'minhas'">
                    <div class="section-header">
                        <h2 class="section-title">Minhas solicitações</h2>
                        <select v-model="filtroStatusMinhas" class="filtro-status-select">
                            <option value="">Todos os status</option>
                            <option value="pendente">Pendente</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="devolvido">Devolvido</option>
                            <option value="rejeitado">Rejeitado</option>
                        </select>
                    </div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>EPI</th>
                                    <th>Data entrega</th>
                                    <th>Status</th>
                                    <th>Devolução</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="e in minhasEntregasFiltradas" :key="e.id">
                                    <td>{{ e.epi_nome }}</td>
                                    <td>{{ formatDate(e.data_entrega) }}</td>
                                    <td><span :class="['badge', getBadgeStatus(e.status)]">{{ formatStatus(e.status)
                                            }}</span></td>
                                    <td>{{ e.data_devolucao ? formatDate(e.data_devolucao) : '—' }}</td>
                                    <td><button v-if="!e.data_devolucao && e.status === 'aprovado'"
                                            class="btn-sm btn-outline" @click="devolverEpi(e)">Devolver</button></td>
                                </tr>
                                <tr v-if="minhasEntregasFiltradas.length === 0">
                                    <td colspan="5" class="empty-row">Nenhuma entrega encontrada.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="cards-mobile">
                        <div v-if="minhasEntregasFiltradas.length === 0" class="card-empty">Nenhuma entrega encontrada.
                        </div>
                        <div v-for="e in minhasEntregasFiltradas" :key="e.id" class="item-card">
                            <div class="item-card-header">
                                <span class="item-card-nome">{{ e.epi_nome }}</span>
                                <span :class="['badge', getBadgeStatus(e.status)]">{{ formatStatus(e.status) }}</span>
                            </div>
                            <div class="item-card-row"><span class="item-card-label">Entrega</span><span>{{
                                    formatDate(e.data_entrega) }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Devolução</span><span>{{
                                e.data_devolucao ? formatDate(e.data_devolucao) : '—' }}</span></div>
                            <div class="item-card-row" v-if="!e.data_devolucao && e.status === 'aprovado'">
                                <span class="item-card-label"></span>
                                <button class="btn-sm btn-outline" @click="devolverEpi(e)">Devolver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="role === 'aluno'">
                <div class="tabs">
                    <button :class="['tab', { active: tabAluno === 'epis' }]" @click="tabAluno = 'epis'"><i
                            class="fa-solid fa-boxes-stacked"></i> EPIs disponíveis</button>
                    <button :class="['tab', { active: tabAluno === 'minhas' }]" @click="tabAluno = 'minhas'"><i
                            class="fa-solid fa-user"></i> Minhas solicitações</button>
                </div>

                <div v-if="tabAluno === 'epis'">
                    <div class="section-header">
                        <h2 class="section-title">EPIs disponíveis</h2>
                    </div>
                    <div class="filtros-bar">
                        <div class="filtro-search"><i class="fa-solid fa-magnifying-glass"></i><input
                                v-model="filtroNome" type="text" placeholder="Buscar EPIs..."></div>
                        <select v-model="filtroTipo">
                            <option value="">Todos os tipos</option>
                            <option v-for="tipo in tiposDisponiveis" :key="tipo" :value="tipo">{{ tipo }}</option>
                        </select>
                        <select v-model="filtroDisponibilidade">
                            <option value="">Todas as disponibilidades</option>
                            <option value="disponivel">Disponível</option>
                            <option value="baixo">Estoque baixo</option>
                        </select>
                    </div>
                    <div class="epis-grid">
                        <div class="epi-card" v-for="epi in episFiltrados" :key="epi.idepis">
                            <div class="epi-card-top">
                                <div class="epi-card-icon"><i :class="getIcone(epi)"></i></div>
                                <span :class="['stock-chip', epi.quantidade <= 5 ? 'chip-low' : 'chip-ok']">{{
                                    epi.quantidade }} un.</span>
                            </div>
                            <div class="epi-card-body">
                                <h3>{{ epi.nome }}</h3>
                                <p>{{ epi.tipo }}</p>
                            </div>
                            <div class="epi-stock-bar">
                                <div class="epi-stock-fill"
                                    :style="{ width: Math.min(100, (epi.quantidade / 100) * 100) + '%' }"></div>
                            </div>
                            <button class="btn-sm btn-full" @click="abrirModalSolicitar(epi, 'aluno')"><i
                                    class="fa-solid fa-hand"></i> Solicitar</button>
                        </div>
                        <div v-if="episFiltrados.length === 0" class="filtro-empty">Nenhum EPI encontrado com esses
                            filtros.</div>
                    </div>
                </div>

                <div v-if="tabAluno === 'minhas'">
                    <h2 class="section-title">Minhas solicitações</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>EPI</th>
                                    <th>Tipo</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="e in minhasEntregas" :key="e.id">
                                    <td>{{ e.epi_nome }}</td>
                                    <td>{{ e.epi_tipo }}</td>
                                    <td>{{ formatDate(e.data_entrega) }}</td>
                                    <td><span :class="['badge', getBadgeStatus(e.status)]">{{ formatStatus(e.status)
                                            }}</span></td>
                                </tr>
                                <tr v-if="minhasEntregas.length === 0">
                                    <td colspan="4" class="empty-row">Nenhuma solicitação ainda.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="cards-mobile">
                        <div v-if="minhasEntregas.length === 0" class="card-empty">Nenhuma solicitação ainda.</div>
                        <div v-for="e in minhasEntregas" :key="e.id" class="item-card">
                            <div class="item-card-header">
                                <span class="item-card-nome">{{ e.epi_nome }}</span>
                                <span :class="['badge', getBadgeStatus(e.status)]">{{ formatStatus(e.status) }}</span>
                            </div>
                            <div class="item-card-row"><span class="item-card-label">Tipo</span><span>{{ e.epi_tipo
                                    }}</span></div>
                            <div class="item-card-row"><span class="item-card-label">Data</span><span>{{
                                    formatDate(e.data_entrega) }}</span></div>
                        </div>
                    </div>
                </div>
            </template>

        </template>

        <div class="modal-overlay" v-if="modalEpi" @click.self="modalEpi = false">
            <div class="modal">
                <h2 class="modal-title">{{ editandoEpi ? 'Editar EPI' : 'Novo EPI' }}</h2>
                <div class="modal-form">
                    <div class="field"><label>Nome</label><input v-model="formEpi.nome" type="text"
                            placeholder="Nome do EPI">
                    </div>
                    <div class="field"><label>Tipo</label><input v-model="formEpi.tipo" type="text"
                            placeholder="Ex: Proteção da Cabeça"></div>
                    <div class="field"><label>Quantidade</label><input v-model.number="formEpi.quantidade" type="number"
                            min="0"></div>
                    <div class="field"><label>Código patrimônio</label><input v-model="formEpi.codigo_patrimonio"
                            type="text" placeholder="CAP-001"></div>
                    <div class="field"><label>Validade</label><input v-model="formEpi.data_validade" type="date"></div>
                    <div class="field field-check"><label>Disponível</label><input v-model="formEpi.disponivel"
                            type="checkbox">
                    </div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalEpi = false">Cancelar</button>
                    <button class="btn-primary" @click="salvarEpi" :disabled="salvando">{{ salvando ? 'Salvando...' :
                        'Salvar'
                        }}</button>
                </div>
            </div>
        </div>

        <div class="modal-overlay" v-if="modalLote" @click.self="modalLote = false">
            <div class="modal">
                <h2 class="modal-title">Solicitar EPIs em lote</h2>
                <div class="modal-form">
                    <div class="field">
                        <label>EPI</label>
                        <select v-model="formLote.epi_id">
                            <option value="" disabled>Selecione um EPI</option>
                            <option v-for="epi in episDisponiveis" :key="epi.idepis" :value="epi.idepis">{{ epi.nome }}
                            </option>
                        </select>
                    </div>
                    <div class="field"><label>Quantidade</label><input v-model.number="formLote.quantidade"
                            type="number" min="1"></div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalLote = false">Cancelar</button>
                    <button class="btn-primary" @click="confirmarLote" :disabled="salvando">{{ salvando ? 'Enviando...'
                        :
                        'Solicitar' }}</button>
                </div>
            </div>
        </div>

        <div class="modal-overlay" v-if="modalSolicitar" @click.self="modalSolicitar = false">
            <div class="modal">
                <div class="modal-epi-header">
                    <div class="modal-epi-icon"><i :class="getIcone(epiSelecionado)"></i></div>
                    <div>
                        <h2 class="modal-title">{{ epiSelecionado?.nome }}</h2>
                        <p class="modal-epi-tipo">{{ epiSelecionado?.tipo }}</p>
                    </div>
                </div>
                <div class="modal-epi-info">
                    <div class="modal-info-row"><span class="modal-info-label">Disponibilidade</span><span
                            class="badge badge-green">{{ epiSelecionado?.quantidade }} unidades</span></div>
                    <div class="modal-info-row"><span class="modal-info-label">Validade</span><span
                            class="modal-info-value">{{
                                formatDate(epiSelecionado?.data_validade) }}</span></div>
                    <div class="modal-info-row"><span class="modal-info-label">Código patrimônio</span><span
                            class="modal-info-value">{{ epiSelecionado?.codigo_patrimonio || '—' }}</span></div>
                    <div class="modal-info-row"><span class="modal-info-label">Data de solicitação</span><span
                            class="modal-info-value">{{ dataHoje }}</span></div>
                </div>
                <div class="qtd-section">
                    <label class="qtd-label">Quantidade desejada</label>
                    <div class="qtd-control">
                        <button class="qtd-btn" @click="decQtd" :disabled="qtdSolicitacao <= 1"><i
                                class="fa-solid fa-minus"></i></button>
                        <input v-model.number="qtdSolicitacao" type="number" min="1"
                            :max="epiSelecionado?.quantidade || 1" class="qtd-input">
                        <button class="qtd-btn" @click="incQtd"
                            :disabled="qtdSolicitacao >= (epiSelecionado?.quantidade || 1)"><i
                                class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalSolicitar = false">Cancelar</button>
                    <button class="btn-primary" @click="confirmarSolicitacao" :disabled="salvando">{{ salvando ?
                        'Solicitando...' : 'Confirmar solicitação' }}</button>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref, computed, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Estoque',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();
        const showToast = inject("showToast");
        const sidebarOpen = ref(false);
        const loading = ref(true);
        const role = ref('');
        const userId = ref('');
        const userEmail = ref('');
        const funcionarioId = ref(null);
        const alunoId = ref(null);

        const tabAdmin = ref('epis');
        const tabDocente = ref('epis');
        const tabAluno = ref('epis');

        const ITENS_POR_PAGINA = 10;
        const paginaEpis = ref(1);
        const paginaSolicitacoes = ref(1);

        const epis = ref([]);
        const episDisponiveis = computed(() => epis.value.filter(e => e.disponivel && e.quantidade > 0));
        const episPaginados = computed(() => {
            const inicio = (paginaEpis.value - 1) * ITENS_POR_PAGINA;
            return epis.value.slice(inicio, inicio + ITENS_POR_PAGINA);
        });
        const totalPaginasEpis = computed(() => Math.ceil(epis.value.length / ITENS_POR_PAGINA));

        const filtroNome = ref('');
        const filtroTipo = ref('');
        const filtroDisponibilidade = ref('');

        const tiposDisponiveis = computed(() => {
            const tipos = epis.value.map(e => e.tipo).filter(Boolean);
            return [...new Set(tipos)].sort();
        });

        const episFiltrados = computed(() => {
            return episDisponiveis.value.filter(e => {
                const nomeOk = !filtroNome.value || e.nome.toLowerCase().includes(filtroNome.value.toLowerCase());
                const tipoOk = !filtroTipo.value || e.tipo === filtroTipo.value;
                const dispOk = !filtroDisponibilidade.value ||
                    (filtroDisponibilidade.value === 'disponivel' && e.quantidade > 5) ||
                    (filtroDisponibilidade.value === 'baixo' && e.quantidade <= 5);
                return nomeOk && tipoOk && dispOk;
            });
        });

        const solicitacoes = ref([]);
        const solicitacoesPaginadas = computed(() => {
            const inicio = (paginaSolicitacoes.value - 1) * ITENS_POR_PAGINA;
            return solicitacoes.value.slice(inicio, inicio + ITENS_POR_PAGINA);
        });
        const totalPaginasSolicitacoes = computed(() => Math.ceil(solicitacoes.value.length / ITENS_POR_PAGINA));

        const solicitacoesAlunos = ref([]);
        const minhasEntregas = ref([]);
        const filtroStatusMinhas = ref('');
        const minhasEntregasFiltradas = computed(() => {
            if (!filtroStatusMinhas.value) return minhasEntregas.value;
            return minhasEntregas.value.filter(e => e.status === filtroStatusMinhas.value);
        });

        const modalEpi = ref(false);
        const editandoEpi = ref(false);
        const formEpi = ref({ nome: '', tipo: '', quantidade: 0, disponivel: true, data_validade: '', codigo_patrimonio: '' });
        const modalError = ref('');
        const salvando = ref(false);

        const modalSolicitar = ref(false);
        const epiSelecionado = ref(null);
        const tipoSolicitante = ref('');
        const qtdSolicitacao = ref(1);
        const dataHoje = new Date().toLocaleDateString('pt-BR');

        function getIcone(epi) {
            if (!epi) return 'fa-solid fa-helmet-safety';
            const texto = `${epi.tipo || ''} ${epi.nome || ''}`.toLowerCase();
            if (texto.includes('cabeça') || texto.includes('capacete')) return 'fa-solid fa-helmet-safety';
            if (texto.includes('pé') || texto.includes('pes') || texto.includes('bota') || texto.includes('calçado')) return 'fa-solid fa-shoe-prints';
            if (texto.includes('mão') || texto.includes('mao') || texto.includes('luva')) return 'fa-solid fa-mitten';
            if (texto.includes('respirat') || texto.includes('máscara') || texto.includes('mascara') || texto.includes('pff')) return 'fa-solid fa-mask-face';
            if (texto.includes('visual') || texto.includes('óculos') || texto.includes('oculos')) return 'fa-solid fa-glasses';
            if (texto.includes('auditiv') || texto.includes('auricular') || texto.includes('ouvido')) return 'fa-solid fa-ear-listen';
            if (texto.includes('corpo') || texto.includes('avental') || texto.includes('macacão') || texto.includes('macacao')) return 'fa-solid fa-shirt';
            return 'fa-solid fa-helmet-safety';
        }

        function abrirModalSolicitar(epi, tipo) {
            epiSelecionado.value = epi;
            tipoSolicitante.value = tipo;
            qtdSolicitacao.value = 1;
            modalError.value = '';
            modalSolicitar.value = true;
        }

        function incQtd() { if (qtdSolicitacao.value < (epiSelecionado.value?.quantidade || 1)) qtdSolicitacao.value++; }
        function decQtd() { if (qtdSolicitacao.value > 1) qtdSolicitacao.value--; }

        async function confirmarSolicitacao() {
            const qtd = parseInt(qtdSolicitacao.value) || 1;
            salvando.value = true;
            modalError.value = '';

            const { data: epiAtual, error: erroConsulta } = await supabase.from('epis').select('quantidade').eq('idepis', epiSelecionado.value.idepis).single();
            if (erroConsulta || !epiAtual) { modalError.value = 'Erro ao verificar estoque.'; salvando.value = false; return; }
            if (epiAtual.quantidade <= 0) { modalError.value = 'Este EPI está sem estoque disponível.'; salvando.value = false; return; }
            if (qtd > epiAtual.quantidade) { modalError.value = `Estoque insuficiente. Disponível: ${epiAtual.quantidade} unidade(s).`; salvando.value = false; return; }

            const hoje = new Date().toISOString().split('T')[0];

            if (tipoSolicitante.value === 'aluno') {
                if (!alunoId.value) { modalError.value = 'Aluno não identificado.'; salvando.value = false; return; }
                const inserts = Array.from({ length: qtd }, () => ({ aluno_id: alunoId.value, epis_id: epiSelecionado.value.idepis, data_entrega: hoje, status: 'pendente' }));
                const { error } = await supabase.from('aluno_has_epis').insert(inserts);
                if (error) { modalError.value = 'Erro ao solicitar.'; salvando.value = false; return; }
                await carregarEntregasAluno();
            } else {
                if (!funcionarioId.value) { modalError.value = 'Funcionário não identificado.'; salvando.value = false; return; }
                const inserts = Array.from({ length: qtd }, () => ({ funcionario_id: funcionarioId.value, epis_id: epiSelecionado.value.idepis, data_entrega: hoje, status: 'pendente' }));
                const { error } = await supabase.from('funcionario_has_epis').insert(inserts);
                if (error) { modalError.value = 'Erro ao solicitar.'; salvando.value = false; return; }
                await carregarEntregasFuncionario();
            }

            salvando.value = false;
            modalSolicitar.value = false;
            showToast('Solicitação enviada com sucesso.', 'success');
        }

        const modalLote = ref(false);
        const formLote = ref({ epi_id: '', quantidade: 1 });

        function formatDate(d) { if (!d) return '—'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}`; }
        function getBadgeStatus(s) { if (s === 'aprovado' || s === 'entregue' || s === 'devolvido') return 'badge-green'; if (s === 'rejeitado') return 'badge-red'; return 'badge-yellow'; }
        function formatStatus(s) { if (!s) return 'Pendente'; return s.charAt(0).toUpperCase() + s.slice(1); }

        async function carregarEpis() {
            const { data } = await supabase.from('epis').select('*').order('nome');
            if (data) { epis.value = data; paginaEpis.value = 1; }
        }

        async function carregarSolicitacoes() {
            const { data: sa } = await supabase.from('aluno_has_epis').select('id_entrega_aluno, data_entrega, status, aluno(nome, sobrenome), epis(nome, idepis)').order('data_entrega', { ascending: false });
            const { data: sf } = await supabase.from('funcionario_has_epis').select('id_entrega_func, data_entrega, data_devolucao, status, funcionario(nome, sobrenome, email), epis(nome, idepis)').order('data_entrega', { ascending: false });
            const lista = [];
            if (sa) sa.forEach(s => lista.push({ id: `a-${s.id_entrega_aluno}`, solicitante: `${s.aluno?.nome || ''} ${s.aluno?.sobrenome || ''}`.trim(), tipo_solicitante: 'Aluno', epi_nome: s.epis?.nome, epi_id: s.epis?.idepis, data: s.data_entrega, status: s.status || 'pendente', origem: 'aluno', origem_id: s.id_entrega_aluno }));
            if (sf) {
                const emails = [...new Set(sf.map(s => s.funcionario?.email).filter(Boolean))];
                let rolesMap = {};
                if (emails.length > 0) {
                    const { data: profs } = await supabase.from('profiles').select('email, role').in('email', emails);
                    if (profs) profs.forEach(p => { rolesMap[p.email] = p.role; });
                }
                sf.forEach(s => {
                    const r = rolesMap[s.funcionario?.email];
                    let tipo = 'Funcionário';
                    if (r === 'docente') tipo = 'Docente';
                    else if (r === 'admin') tipo = 'Admin';
                    lista.push({ id: `f-${s.id_entrega_func}`, solicitante: `${s.funcionario?.nome || ''} ${s.funcionario?.sobrenome || ''}`.trim(), tipo_solicitante: tipo, epi_nome: s.epis?.nome, epi_id: s.epis?.idepis, data: s.data_entrega, status: s.status || 'pendente', origem: 'funcionario', origem_id: s.id_entrega_func });
                });
            }
            solicitacoes.value = lista;
            paginaSolicitacoes.value = 1;
        }

        async function carregarEntregasAluno() {
            if (!alunoId.value) return;
            const { data } = await supabase.from('aluno_has_epis').select('id_entrega_aluno, data_entrega, status, epis(nome, tipo)').eq('aluno_id', alunoId.value).order('data_entrega', { ascending: false });
            if (data) minhasEntregas.value = data.map(e => ({ id: e.id_entrega_aluno, epi_nome: e.epis?.nome, epi_tipo: e.epis?.tipo, data_entrega: e.data_entrega, status: e.status || 'pendente' }));
        }

        async function carregarEntregasFuncionario() {
            if (!funcionarioId.value) return;
            const { data } = await supabase.from('funcionario_has_epis').select('id_entrega_func, data_entrega, data_devolucao, status, epis(nome)').eq('funcionario_id', funcionarioId.value).order('data_entrega', { ascending: false });
            if (data) minhasEntregas.value = data.map(e => ({ id: e.id_entrega_func, epi_nome: e.epis?.nome, data_entrega: e.data_entrega, data_devolucao: e.data_devolucao, status: e.status || 'pendente' }));
        }

        async function carregarSolicitacoesAlunos() {
            const { data } = await supabase.from('aluno_has_epis').select('id_entrega_aluno, data_entrega, status, aluno(nome, sobrenome), epis(nome, idepis)').order('data_entrega', { ascending: false });
            if (data) solicitacoesAlunos.value = data.map(s => ({ id: `a-${s.id_entrega_aluno}`, solicitante: `${s.aluno?.nome || ''} ${s.aluno?.sobrenome || ''}`.trim(), epi_nome: s.epis?.nome, epi_id: s.epis?.idepis, data: s.data_entrega, status: s.status || 'pendente', origem: 'aluno', origem_id: s.id_entrega_aluno }));
        }

        function abrirModalNovoEpi() { editandoEpi.value = false; formEpi.value = { nome: '', tipo: '', quantidade: 0, disponivel: true, data_validade: '', codigo_patrimonio: '' }; modalError.value = ''; modalEpi.value = true; }
        function abrirModalEditarEpi(epi) { editandoEpi.value = true; formEpi.value = { ...epi }; modalError.value = ''; modalEpi.value = true; }

        async function salvarEpi() {
            if (!formEpi.value.nome) { modalError.value = 'Nome obrigatório.'; return; }
            salvando.value = true;
            modalError.value = '';
            if (editandoEpi.value) {
                const { error } = await supabase.from('epis').update({ nome: formEpi.value.nome, tipo: formEpi.value.tipo, quantidade: formEpi.value.quantidade, disponivel: formEpi.value.disponivel, data_validade: formEpi.value.data_validade || null, codigo_patrimonio: formEpi.value.codigo_patrimonio || null }).eq('idepis', formEpi.value.idepis);
                if (error) { modalError.value = 'Erro ao salvar.'; salvando.value = false; return; }
            } else {
                const { error } = await supabase.from('epis').insert({ nome: formEpi.value.nome, tipo: formEpi.value.tipo, quantidade: formEpi.value.quantidade, disponivel: formEpi.value.disponivel, data_validade: formEpi.value.data_validade || null, codigo_patrimonio: formEpi.value.codigo_patrimonio || null });
                if (error) { modalError.value = 'Erro ao criar EPI.'; salvando.value = false; return; }
            }
            await carregarEpis();
            salvando.value = false;
            modalEpi.value = false;
            showToast(editandoEpi.value ? 'EPI atualizado com sucesso.' : 'EPI criado com sucesso.', 'success');
        }

        async function deletarEpi(id) {
            if (!confirm('Deletar este EPI?')) return;
            await supabase.from('epis').delete().eq('idepis', id);
            await carregarEpis();
        }

        async function aprovarSolicitacao(s) {
            const tabela = s.origem === 'aluno' ? 'aluno_has_epis' : 'funcionario_has_epis';
            const idCol = s.origem === 'aluno' ? 'id_entrega_aluno' : 'id_entrega_func';
            const { data: epiAtual, error: erroConsulta } = await supabase.from('epis').select('quantidade').eq('idepis', s.epi_id).single();
            if (erroConsulta || !epiAtual) { showToast('Erro ao verificar estoque.', 'error'); return; }
            if (epiAtual.quantidade <= 0) { showToast('Não é possível aprovar: estoque zerado para este EPI.', 'error'); return; }
            const { error: erroStatus } = await supabase.from(tabela).update({ status: 'aprovado' }).eq(idCol, s.origem_id);
            if (erroStatus) { showToast('Erro ao aprovar solicitação.', 'error'); return; }
            const { error: erroEstoque } = await supabase.from('epis').update({ quantidade: epiAtual.quantidade - 1 }).eq('idepis', s.epi_id);
            if (erroEstoque) { showToast('Solicitação aprovada, mas erro ao atualizar estoque. Verifique manualmente.', 'warning'); } else { showToast('Solicitação aprovada com sucesso.', 'success'); }
            await carregarEpis();
            if (role.value === 'admin') await carregarSolicitacoes();
            if (role.value === 'docente') await carregarSolicitacoesAlunos();
        }

        async function rejeitarSolicitacao(s) {
            const tabela = s.origem === 'aluno' ? 'aluno_has_epis' : 'funcionario_has_epis';
            const idCol = s.origem === 'aluno' ? 'id_entrega_aluno' : 'id_entrega_func';
            const { error } = await supabase.from(tabela).update({ status: 'rejeitado' }).eq(idCol, s.origem_id);
            if (error) { showToast('Erro ao rejeitar solicitação.', 'error'); return; }
            showToast('Solicitação rejeitada.', 'warning');
            if (role.value === 'admin') await carregarSolicitacoes();
            if (role.value === 'docente') await carregarSolicitacoesAlunos();
        }

        function abrirModalSolicitarLote() { formLote.value = { epi_id: '', quantidade: 1 }; modalError.value = ''; modalLote.value = true; }

        async function confirmarLote() {
            if (!formLote.value.epi_id || formLote.value.quantidade < 1) { modalError.value = 'Selecione um EPI e quantidade válida.'; return; }
            salvando.value = true;
            modalError.value = '';
            const { data: epiAtual, error: erroConsulta } = await supabase.from('epis').select('quantidade').eq('idepis', formLote.value.epi_id).single();
            if (erroConsulta || !epiAtual) { modalError.value = 'Erro ao verificar estoque.'; salvando.value = false; return; }
            if (epiAtual.quantidade <= 0) { modalError.value = 'Este EPI está sem estoque disponível.'; salvando.value = false; return; }
            if (formLote.value.quantidade > epiAtual.quantidade) { modalError.value = `Estoque insuficiente. Disponível: ${epiAtual.quantidade} unidade(s).`; salvando.value = false; return; }
            const inserts = [];
            for (let i = 0; i < formLote.value.quantidade; i++) { inserts.push({ funcionario_id: funcionarioId.value, epis_id: formLote.value.epi_id, data_entrega: new Date().toISOString().split('T')[0], status: 'pendente' }); }
            const { error } = await supabase.from('funcionario_has_epis').insert(inserts);
            salvando.value = false;
            if (error) { modalError.value = 'Erro ao solicitar.'; return; }
            showToast('Solicitação em lote enviada com sucesso.', 'success');
            await carregarEntregasFuncionario();
            modalLote.value = false;
        }

        async function devolverEpi(entrega) {
            const { error } = await supabase.from('funcionario_has_epis').update({ data_devolucao: new Date().toISOString().split('T')[0], status: 'devolvido' }).eq('id_entrega_func', entrega.id);
            if (error) { showToast('Erro ao devolver EPI.', 'error'); return; }
            const idx = minhasEntregas.value.findIndex(e => e.id === entrega.id);
            if (idx !== -1) {
                minhasEntregas.value[idx] = { ...minhasEntregas.value[idx], status: 'devolvido', data_devolucao: new Date().toISOString().split('T')[0] };
            }
            showToast('EPI devolvido com sucesso.', 'success');
        }

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }
            userId.value = data.session.user.id;
            userEmail.value = data.session.user.email;
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', userId.value).single();
            if (profile) role.value = profile.role;
            await carregarEpis();
            if (role.value === 'admin') { const { data: func } = await supabase.from('funcionario').select('idfuncionario').eq('email', userEmail.value).single(); if (func) funcionarioId.value = func.idfuncionario; await carregarSolicitacoes(); }
            if (role.value === 'docente') { const { data: func } = await supabase.from('funcionario').select('idfuncionario').eq('email', userEmail.value).single(); if (func) funcionarioId.value = func.idfuncionario; await carregarEntregasFuncionario(); await carregarSolicitacoesAlunos(); }
            if (role.value === 'aluno') { const { data: aluno } = await supabase.from('aluno').select('idaluno').eq('auth_id', userId.value).single(); if (aluno) alunoId.value = aluno.idaluno; await carregarEntregasAluno(); }
            loading.value = false;
        });

        return {
            sidebarOpen, loading, role, tabAdmin, tabDocente, tabAluno,
            epis, episDisponiveis, episFiltrados, episPaginados, totalPaginasEpis, paginaEpis,
            solicitacoes, solicitacoesPaginadas, totalPaginasSolicitacoes, paginaSolicitacoes,
            solicitacoesAlunos, minhasEntregas,
            filtroNome, filtroTipo, filtroDisponibilidade, tiposDisponiveis,
            modalEpi, editandoEpi, formEpi, modalError, salvando,
            modalLote, formLote,
            formatDate, getBadgeStatus, formatStatus, getIcone,
            abrirModalNovoEpi, abrirModalEditarEpi, salvarEpi, deletarEpi,
            aprovarSolicitacao, rejeitarSolicitacao,
            modalSolicitar, epiSelecionado, dataHoje, qtdSolicitacao,
            abrirModalSolicitar, confirmarSolicitacao, incQtd, decQtd,
            abrirModalSolicitarLote, confirmarLote, devolverEpi,
            filtroStatusMinhas, minhasEntregasFiltradas
        };
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background: linear-gradient(180deg, #f0f4ff 0%, #e8eeff 100%);
    padding: 2rem 4rem 4rem 4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.page-header {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #d0daf0;
    border-left: 6px solid #243c75;
    box-shadow: 0 8px 32px rgba(36, 60, 117, 0.08);
}

.script {
    font-family: 'Pinyon Script', cursive;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.page-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 3.5rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
}

.loading {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 1rem;
    text-align: center;
    padding: 3rem;
}

.tabs {
    display: flex;
    gap: 0.25rem;
    background: #fff;
    padding: 0.4rem;
    border-radius: 12px;
    border: 1px solid #d0daf0;
    width: fit-content;
    box-shadow: 0 4px 16px rgba(36, 60, 117, 0.05);
}

.tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    padding: 0.7rem 1.25rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: #6b82b0;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.tab:hover {
    color: #243c75;
    background: #f0f4ff;
}

.tab.active {
    background: #243c75;
    color: #ebfbff;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.section-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #243c75;
    color: #ebfbff;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.3rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(36, 60, 117, 0.2);
}

.btn-primary:hover {
    background: #1a2d5a;
    transform: translateY(-1px);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-outline {
    background: transparent;
    border: 2px solid #243c75;
    color: #243c75;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-outline:hover {
    background: #243c75;
    color: #ebfbff;
}

.btn-sm {
    background: #243c75;
    color: #ebfbff;
    border: none;
    border-radius: 8px;
    padding: 0.55rem 1rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    justify-content: center;
}

.btn-sm:hover {
    background: #1a2d5a;
}

.btn-full {
    width: 100%;
}

.btn-sm.btn-outline {
    background: transparent;
    border: 1.5px solid #243c75;
    color: #243c75;
}

.btn-icon {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    background: #e8eeff;
    color: #243c75;
    transition: all 0.2s ease;
}

.btn-icon:hover {
    background: #243c75;
    color: #ebfbff;
}

.btn-icon.btn-danger {
    background: #fee2e2;
    color: #b91c1c;
}

.btn-icon.btn-danger:hover {
    background: #b91c1c;
    color: #fff;
}

.btn-icon.btn-green {
    background: #dcfce7;
    color: #15803d;
}

.btn-icon.btn-green:hover {
    background: #15803d;
    color: #fff;
}

.table-wrapper {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #d0daf0;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.08);
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th {
    font-family: 'Anton', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9aaac5;
    background: #f8f9ff;
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #e8edf8;
}

.table td {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    color: #1a2b5e;
    padding: 0.95rem 1.25rem;
    border-bottom: 1px solid #edf0f8;
}

.table tr:last-child td {
    border-bottom: none;
}

.table tr:hover td {
    background: #f8f9ff;
}

.actions-cell {
    display: flex;
    gap: 0.4rem;
    align-items: center;
}

.empty-row {
    text-align: center;
    color: #9aaac5 !important;
    padding: 2.5rem !important;
    font-style: italic;
}

.paginacao {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
}

.pag-btn {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 8px;
    border: 1.5px solid #d0daf0;
    background: #fff;
    color: #243c75;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    transition: all 0.2s ease;
}

.pag-btn:hover:not(:disabled) {
    background: #243c75;
    color: #ebfbff;
    border-color: #243c75;
}

.pag-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.pag-info {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #6b82b0;
}

.badge {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: inline-block;
}

.badge-green {
    background: #dcfce7;
    color: #15803d;
}

.badge-red {
    background: #fee2e2;
    color: #b91c1c;
}

.badge-yellow {
    background: #fef3c7;
    color: #b45309;
}

.filtros-bar {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
}

.filtro-search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff;
    border: 1.5px solid #d0daf0;
    border-radius: 10px;
    padding: 0 1rem;
    flex: 1;
    min-width: 180px;
    height: 2.8rem;
    transition: border-color 0.2s ease;
}

.filtro-search:focus-within {
    border-color: #243c75;
}

.filtro-search i {
    color: #9aaac5;
    font-size: 0.85rem;
}

.filtro-search input {
    border: none;
    outline: none;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.92rem;
    color: #1a2b5e;
    background: transparent;
    width: 100%;
    height: 100%;
}

.filtros-bar select {
    height: 2.8rem;
    padding: 0 1rem;
    border: 1.5px solid #d0daf0;
    border-radius: 10px;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.92rem;
    color: #1a2b5e;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.2s ease;
    min-width: 160px;
}

.filtros-bar select:focus {
    outline: none;
    border-color: #243c75;
}

.filtro-empty {
    grid-column: 1 / -1;
    text-align: center;
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.95rem;
    font-style: italic;
    padding: 2.5rem;
}

.epis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
}

.epi-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 14px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    box-shadow: 0 2px 12px rgba(36, 60, 117, 0.06);
    transition: all 0.25s ease;
}

.epi-card:hover {
    box-shadow: 0 12px 32px rgba(36, 60, 117, 0.14);
    transform: translateY(-4px);
    border-color: #243c75;
}

.epi-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.epi-card-icon {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #243c75 0%, #3a5ba8 100%);
    color: #ebfbff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
}

.stock-chip {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.chip-ok {
    background: #dcfce7;
    color: #15803d;
}

.chip-low {
    background: #fee2e2;
    color: #b91c1c;
}

.epi-card-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-height: 3.5rem;
}

.epi-card-body h3 {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.05rem;
    margin: 0;
    line-height: 1.2;
}

.epi-card-body p {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.82rem;
    margin: 0;
}

.epi-stock-bar {
    width: 100%;
    height: 6px;
    background: #e8eeff;
    border-radius: 99px;
    overflow: hidden;
}

.epi-stock-fill {
    height: 100%;
    background: linear-gradient(90deg, #243c75 0%, #3a5ba8 100%);
    border-radius: 99px;
    transition: width 0.4s ease;
}

.cards-mobile {
    display: none;
}

.item-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    box-shadow: 0 2px 12px rgba(36, 60, 117, 0.06);
}

.item-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.item-card-nome {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 0.98rem;
}

.item-card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #1a2b5e;
    border-top: 1px solid #f0f4ff;
    padding-top: 0.5rem;
}

.item-card-label {
    font-family: 'Anton', sans-serif;
    font-size: 0.7rem;
    color: #9aaac5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    flex-shrink: 0;
}

.card-empty {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.95rem;
    text-align: center;
    padding: 2.5rem;
    font-style: italic;
    background: #fff;
    border-radius: 14px;
    border: 1px solid #d0daf0;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 20, 50, 0.55);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal {
    background: #fff;
    border-radius: 18px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
}

.modal-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.3rem;
    margin: 0;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field.field-check {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.field label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.field input,
.field select {
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
    border: 1.5px solid #d0daf0;
    border-radius: 8px;
    height: 2.8rem;
    box-sizing: border-box;
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    transition: border-color 0.2s ease;
}

.field input:focus,
.field select:focus {
    outline: none;
    border-color: #243c75;
}

.field input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.error-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #b91c1c;
    font-size: 0.9rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    margin: 0;
}

.modal-epi-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e8edf8;
}

.modal-epi-icon {
    width: 3.5rem;
    height: 3.5rem;
    background: linear-gradient(135deg, #243c75 0%, #3a5ba8 100%);
    color: #ebfbff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.modal-epi-tipo {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.9rem;
    margin: 0.2rem 0 0 0;
}

.modal-epi-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #f8f9ff;
    border-radius: 12px;
    padding: 1.1rem;
}

.modal-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-info-label {
    font-family: 'Anton', sans-serif;
    color: #9aaac5;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.modal-info-value {
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    font-size: 0.95rem;
    font-weight: 700;
}

.qtd-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
}

.qtd-label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.qtd-control {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.qtd-btn {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 10px;
    border: 1.5px solid #243c75;
    background: #fff;
    color: #243c75;
    cursor: pointer;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.qtd-btn:hover:not(:disabled) {
    background: #243c75;
    color: #fff;
}

.qtd-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.qtd-input {
    width: 4.5rem;
    height: 2.6rem;
    text-align: center;
    border: 1.5px solid #d0daf0;
    border-radius: 8px;
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.1rem;
    color: #243c75;
    box-sizing: border-box;
}

.qtd-input:focus {
    outline: none;
    border-color: #243c75;
}

.filtro-status-select {
    height: 2.4rem;
    padding: 0 1rem;
    border: 1.5px solid #d0daf0;
    border-radius: 8px;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #1a2b5e;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.2s ease;
    min-width: 160px;
}

.filtro-status-select:focus {
    outline: none;
    border-color: #243c75;
}

@media (max-width: 768px) {
    .main {
        padding: 1.25rem 1.25rem 3rem 1.25rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .epis-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

    .tabs {
        width: 100%;
        overflow-x: auto;
    }

    .filtros-bar {
        flex-direction: column;
    }

    .filtros-bar select {
        min-width: 100%;
    }

    .table-wrapper {
        display: none;
    }

    .cards-mobile {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
}
</style>
