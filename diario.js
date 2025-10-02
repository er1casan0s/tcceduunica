// Variáveis globais
        let currentDate = new Date(2025, 8, 1); // Setembro de 2025 (mês 8 = setembro)
        let entries = [
            { date: '2025-09-06', type: 'conquista', title: 'Memória Sensorial', description: 'Completei todos os níveis do jogo de memória sensorial. Consegui melhorar meu tempo de resposta em 30%!', medal: 'gold' },
            { date: '2025-09-08', type: 'atividade', title: 'Exercícios de Comunicação Visual', description: 'Praticar os exercícios de comunicação visual por pelo menos 20 minutos.' },
            { date: '2025-09-10', type: 'conquista', title: 'Comunicação Visual', description: 'Consegui identificar 15 de 20 expressões faciais corretamente no jogo de comunicação visual.', medal: 'silver' },
            { date: '2025-09-12', type: 'atividade', title: 'Jogo de Memória', description: 'Completar o nível 3 do jogo de memória sensorial.' }
        ];

        // Inicialização quando a página carrega
        document.addEventListener('DOMContentLoaded', function() {
            // Renderiza o calendário
            renderCalendar();
            
            // Configura os eventos dos botões do calendário
            document.getElementById('prevMonth').addEventListener('click', previousMonth);
            document.getElementById('nextMonth').addEventListener('click', nextMonth);
            
            // Configura o modal de adicionar entrada
            setupModal();
            
            // Configura o formulário de entrada
            setupEntryForm();
            
            // Configura os botões de marcar como concluído
            setupCompleteButtons();
        });

        // Função para renderizar o calendário
        function renderCalendar() {
            const calendar = document.getElementById('calendar');
            const monthYear = document.getElementById('currentMonth');
            
            // Limpa o calendário (exceto os dias da semana)
            while (calendar.children.length > 7) {
                calendar.removeChild(calendar.lastChild);
            }
            
            // Atualiza o cabeçalho com o mês e ano atual
            const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                              "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            
            // Obtém o primeiro dia do mês
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            // Obtém o último dia do mês
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            
            // Calcula quantos dias do mês anterior precisam ser mostrados
            const startingDay = firstDay.getDay(); // 0 = Domingo, 1 = Segunda, etc.
            
            // Adiciona os dias vazios do mês anterior
            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendar.appendChild(emptyDay);
            }
            
            // Adiciona os dias do mês atual
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;
                
                // Formata a data para comparação
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                
                // Verifica se há entradas para este dia
                const dayEntries = entries.filter(entry => entry.date === dateStr);
                
                // Adiciona classe se houver entradas
                if (dayEntries.length > 0) {
                    day.classList.add('has-entries');
                    
                    // Adiciona evento de clique para mostrar detalhes
                    day.addEventListener('click', function() {
                        showDayEntries(dateStr, dayEntries);
                    });
                }
                
                // Marca o dia atual
                const today = new Date();
                if (currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear() && 
                    i === today.getDate()) {
                    day.classList.add('today');
                }
                
                calendar.appendChild(day);
            }
        }

        // Função para navegar para o mês anterior
        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }

        // Função para navegar para o próximo mês
        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }

        // Função para configurar o modal
        function setupModal() {
            const modal = document.getElementById('entryModal');
            const btnAddEntry = document.getElementById('btnAddEntry');
            const closeBtn = document.querySelector('.close');
            const cancelBtn = document.querySelector('.btn-cancel');
            
            // Abre o modal quando clicar no botão "Nova Entrada"
            btnAddEntry.addEventListener('click', function() {
                modal.style.display = 'block';
                // Define a data atual como padrão
                const today = new Date();
                document.getElementById('entryDate').value = today.toISOString().split('T')[0];
            });
            
            // Fecha o modal quando clicar no X
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Fecha o modal quando clicar no botão Cancelar
            cancelBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Fecha o modal quando clicar fora dele
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Mostra/oculta a seleção de medalhas baseado no tipo de entrada
            document.getElementById('entryType').addEventListener('change', function() {
                const medalSelection = document.getElementById('medalSelection');
                if (this.value === 'conquista') {
                    medalSelection.style.display = 'block';
                } else {
                    medalSelection.style.display = 'none';
                }
            });
        }

        // Função para configurar o formulário de entrada
        function setupEntryForm() {
            const form = document.getElementById('entryForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtém os valores do formulário
                const date = document.getElementById('entryDate').value;
                const type = document.getElementById('entryType').value;
                const title = document.getElementById('entryTitle').value;
                const description = document.getElementById('entryDescription').value;
                let medal = null;
                
                if (type === 'conquista') {
                    const selectedMedal = document.querySelector('input[name="medal"]:checked');
                    medal = selectedMedal ? selectedMedal.value : null;
                }
                
                // Adiciona a nova entrada
                entries.push({ date, type, title, description, medal });
                
                // Fecha o modal
                document.getElementById('entryModal').style.display = 'none';
                
                // Atualiza o calendário
                renderCalendar();
                
                // Limpa o formulário
                form.reset();
                
                // Recarrega a página para mostrar a nova entrada (em um sistema real, você atualizaria apenas as seções relevantes)
                location.reload();
            });
        }

        // Função para configurar os botões de marcar como concluído
        function setupCompleteButtons() {
            const completeButtons = document.querySelectorAll('.btn-complete');
            
            completeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const activity = this.closest('.activity');
                    activity.style.opacity = '0.7';
                    this.textContent = 'Concluída';
                    this.disabled = true;
                    
                    // Aqui você poderia enviar uma requisição para atualizar o status no servidor
                });
            });
        }

        // Função para mostrar as entradas de um dia específico
        function showDayEntries(dateStr, dayEntries) {
            // Formata a data para exibição
            const dateParts = dateStr.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            
            // Cria um modal para mostrar as entradas do dia
            const modal = document.createElement('div');
            modal.className = 'modal day-entries-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Entradas do dia ${formattedDate}</h4>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${dayEntries.map(entry => `
                            <div class="day-entry ${entry.type}">
                                <div class="entry-header">
                                    <h5>${entry.title}</h5>
                                    ${entry.type === 'conquista' ? `<i class="fas fa-medal ${entry.medal}"></i>` : ''}
                                </div>
                                <p>${entry.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'block';
            
            // Configura o botão de fechar
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            });
            
            // Fecha o modal quando clicar fora dele
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.removeChild(modal);
                }
            });
        }