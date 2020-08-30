/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Message, MessageEmbed } from 'discord.js';
import * as moment from "moment";
import Command from '../Command';
import { VIPManager } from '../../core';

class ListVIPCommand extends Command {

  _vipManager: VIPManager;

  constructor(message: Message) {
    super(message, {
      command: "list-vip",
      allowedRoles: [process.env.MANAGEMENT_ROLE_ID],
      description: "List the VIP users."
    });

    this._vipManager = new VIPManager();
  }

  handler = async () => {
    const vipMembers = await this._vipManager.getVIP();
    this.message.channel.send(new MessageEmbed({
      title: "VIP Users",
      description: vipMembers.length > 0 ? vipMembers.map(vipMember => `• <@${vipMember.discordUserId}> **(Until ${vipMember.untilDate ? moment(vipMember.untilDate).fromNow() : "∞"})**`).join('\n') : "None"
    }));
  }
}

export default ListVIPCommand;