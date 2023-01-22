<script>
export default {
  data() {
    return {
      "stats": this.profile['game_stats']
    }
  },
  methods: {
    date(current) {
      const date = new Date(current * 1000)
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      const day = date.getDate()
      const monthIndex = date.getMonth()
      const year = date.getFullYear()

      return `${day} ${monthNames[monthIndex]} ${year}`
    },
    bool(bool) {
      return bool ? "Yes" : "No"
    }
  },
  props: [
      'profile',
      'open'
  ]
}
</script>

<template>
  <div :class="{ open }" class="stats">
    <div class="header">
      <div class="role">{{ profile['is_admin'] ? 'Admin' : 'Player' }}</div>
      <div class="connections">
        <img v-if="profile['gets_newsletter']" class="reverse" src="https://nm.sverben.nl/newsletter.svg" alt="Newsletter" title="Receives newsletter">
        <img v-if="profile['discord_configurated']" src="https://nm.sverben.nl/discord.ico" alt="Discord" title="Discord configurated">
      </div>
    </div>
    <div class="line">
      <div class="key">Registered on</div>
      <div class="value">{{ date(profile['registered_on']) }}</div>
    </div>
    <div class="line">
      <div class="key">Last login</div>
      <div class="value">{{ date(profile['last_seen']) }}</div>
    </div>
    <div class="line">
      <div class="key">Games played</div>
      <div class="value">{{ stats['plays'] }}</div>
    </div>
    <div class="group">
      <div class="game">Fist vs. Feet</div>
      <div class="line">
        <div class="key">Level</div>
        <div class="value">{{ stats['fist_vs_feet']['level'] }}</div>
      </div>
      <div class="line">
        <div class="key">Coins</div>
        <div class="value">{{ stats['fist_vs_feet']['coins'] }}</div>
      </div>
      <div class="line">
        <div class="key">Wins</div>
        <div class="value">{{ stats['fist_vs_feet']['wins'] }}</div>
      </div>
      <div class="line">
        <div class="key">Cosmetics</div>
        <div class="value">{{ stats['fist_vs_feet']['cosmetics_owned'] }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Robot robber</div>
      <div class="line">
        <div class="key">Level</div>
        <div class="value">{{ stats['robot_robber']['level'] }}{{ stats['robot_robber']['completed'] ? ' (Completed)' : '' }}</div>
      </div>
      <div class="line">
        <div class="key">Plus: completed</div>
        <div class="value">{{ bool(stats['robot_robber']['plus_completed']) }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Destroids</div>
      <div class="line">
        <div class="key">Level</div>
        <div class="value">{{ stats['destroids']['level'] }}{{ stats['destroids']['completed'] ? ' (Completed)' : '' }}</div>
      </div>
      <div class="line">
        <div class="key">Cleared</div>
        <div class="value">{{ stats['destroids']['cleared'] }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Card Collector</div>
      <div class="line">
        <div class="key">Wins</div>
        <div class="value">{{ stats['card_collector_wins'] }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Fist Fuss</div>
      <div class="line">
        <div class="key">Wins</div>
        <div class="value">{{ stats['fist_fuss_wins'] }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Split or Steal</div>
      <div class="line">
        <div class="key">Medals stolen</div>
        <div class="value">{{ stats['split_or_steal']['medals_stolen'] }}</div>
      </div>
      <div class="line">
        <div class="key">Parts collected</div>
        <div class="value">{{ stats['split_or_steal']['parts_collected'] }}</div>
      </div>
    </div>
    <div class="group">
      <div class="game">Fisty Bird</div>
      <div class="line">
        <div class="key">Finishes</div>
        <div class="value">{{ stats['fisty_bird_finishes'] }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  position: absolute;
  right: 0;
  width: 350px;
  top: 0;
  bottom: 0;
  translate: 100% 0;
  transition: .3s ease;
  padding: 10px;
  background: var(--secondary);
}
.role {
  font-size: 1.1em;
}
.open {
  translate: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.connections {
  display: flex;
  align-items: center;
  gap: 5px;
}
.connections img {
  width: 20px;
}
.reverse {
  filter: invert(1);
}
.line {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.group {
  padding: 10px;
  margin: 5px 0;
  background: var(--primary);
  border-radius: 5px;
}
.game {
  font-size: 14px;
}
</style>
