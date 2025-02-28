const fs = require('fs');

module.exports = {
    info: {
        name: 'stick',
        description: '접착 메시지 관련 명령어들입니다.',
        options: [
            {
                name: 'message',
                description: '메시지를 이 채널의 접착 메시지로 설정합니다.',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'message',
                        description: '접착 메시지로 설정할 메시지입니다. //로 줄바꿈이 가능합니다.',
                        type: 'STRING',
                        required: true
                    },
                    {
                        name: 'cooldown',
                        description: '몇초간 메시지가 오지 않았을 때 메시지를 다시 작성할지 설정합니다.',
                        type: 'NUMBER'
                    }
                ]
            },
            {
                name: 'embed',
                description: '임베드를 이 채널의 접착 메시지로 설정합니다.',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'title',
                        description: '임베드의 제목입니다. //로 줄바꿈이 가능합니다.',
                        type: 'STRING',
                        required: true
                    },
                    {
                        name: 'description',
                        description: '임베드의 설명입니다. //로 줄바꿈이 가능합니다.',
                        type: 'STRING'
                    },
                    {
                        name: 'color',
                        description: '임베드의 색입니다.',
                        type: 'STRING'
                    },
                    {
                        name: 'image',
                        description: '임베드의 이미지입니다.',
                        type: 'STRING'
                    },
                    {
                        name: 'cooldown',
                        description: '몇초간 메시지가 오지 않았을 때 메시지를 다시 작성할지 설정합니다.',
                        type: 'NUMBER'
                    }
                ]
            },
            {
                name: 'delete',
                description: '이 채널의 접착 메시지를 삭제합니다.',
                type: 'SUB_COMMAND'
            }
        ]
    },
    handler: async interaction => {
        if(!interaction.channel.permissionsFor(interaction.member).has('MANAGE_MESSAGES')) return interaction.reply({
            content: '이 채널에서 "메시지 관리" 권한을 가지고 있어야 합니다.',
            ephemeral: true
        });

        const command = interaction.options.getSubcommand();

        if(fs.existsSync(`./commands/stick/${command}.js`)) require(`./${command}.js`)(interaction);
        else interaction.reply({
            content: '오류가 발생하였습니다.',
            ephemeral: true
        });
    }
}