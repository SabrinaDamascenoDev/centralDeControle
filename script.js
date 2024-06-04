      
        const apiUrl = 'https://emailleadfortalsolar.onrender.com/newsletter/allClientes';
    
        // Função para buscar todos os emails
        async function fetchAllEmails() {
          try {
            // Faz a solicitação GET ao endpoint com cabeçalho Accept configurado para */*
            const response = await fetch(apiUrl, {
              headers: {
                'Accept': '*/*'
              }
            });
    
         
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    

            const data = await response.json();
    
            // Extrai os emails da resposta
            const emails = data.map(cliente => cliente.email);
    
    
            // Atualiza o HTML com os emails
            const emailsContainer = document.querySelector('.emailsRegistrados');
            
            // Limpa os emails existentes
            emailsContainer.innerHTML = '<h3 class="tituloEmails">Emails Inscritos</h3>';
    
            // Adiciona cada email ao container
            emails.forEach(email => {
              const emailDiv = document.createElement('div');
              emailDiv.classList.add('email');
              emailDiv.innerHTML = `<p>${email}</p>`;
              emailsContainer.appendChild(emailDiv);
            });
          } catch (error) {
            console.error('Erro ao buscar emails:', error);
          }
        }
    
        // Chama a função para buscar os emails
        fetchAllEmails();
        const emailForm = document.getElementById('emailForm');
    const subjectInput = document.getElementById('subject');
    const mensagemTextarea = document.getElementById('mensagem');

    emailForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        subject: subjectInput.value.trim(),
        mensagem: mensagemTextarea.value.trim(),
      };


      if (!formData.subject || !formData.mensagem) {
        console.error('Assunto e mensagem são obrigatórios.');
        return;
      }

      try {
        const response = await fetch('https://emailleadfortalsolar.onrender.com/newsletter/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });


        if (response.ok) {
          console.log("Formulário enviado com sucesso!");
        } else {
          console.error("Erro ao enviar o formulário:", responseData);
        }
      } catch (error) {
        console.error("Erro de rede ou outro erro:", error);
      }
    });