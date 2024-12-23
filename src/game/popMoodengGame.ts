import Phaser from 'phaser'

interface GameConfig {
  containerId: string
  onScoreUpdate: (points: number) => void
  onTimeUpdate: (timeLeft: number) => void
  onGameOver: () => void
}

export interface PopMoodengGame {
  destroy: () => void
}

class MoodengScene extends Phaser.Scene {
  private timeLeft: number = 60
  private timer: Phaser.Time.TimerEvent
  private onScoreUpdate: (points: number) => void
  private onTimeUpdate: (timeLeft: number) => void
  private onGameOver: () => void

  constructor(config: GameConfig) {
    super({ key: 'MoodengScene' })
    this.onScoreUpdate = config.onScoreUpdate
    this.onTimeUpdate = config.onTimeUpdate
    this.onGameOver = config.onGameOver
  }

  preload() {
    // Load game assets
    this.load.image('moodeng', '/assets/moodeng.png')
    this.load.image('golden-moodeng', '/assets/golden-moodeng.png')
  }

  create() {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })

    // Spawn Moodengs periodically
    this.time.addEvent({
      delay: 800,
      callback: this.spawnMoodeng,
      callbackScope: this,
      loop: true
    })

    // Spawn Golden Moodengs less frequently
    this.time.addEvent({
      delay: 5000,
      callback: this.spawnGoldenMoodeng,
      callbackScope: this,
      loop: true
    })
  }

  private updateTimer() {
    this.timeLeft--
    this.onTimeUpdate(this.timeLeft)
    
    if (this.timeLeft <= 0) {
      this.timer.destroy()
      this.onGameOver()
    }
  }

  private spawnMoodeng() {
    const x = Phaser.Math.Between(50, this.cameras.main.width - 50)
    const y = Phaser.Math.Between(50, this.cameras.main.height - 50)
    
    const moodeng = this.add.image(x, y, 'moodeng')
      .setInteractive()
      .setScale(0.8)
    
    moodeng.on('pointerdown', () => {
      this.onScoreUpdate(1)
      moodeng.destroy()
    })
    
    // Make it disappear after some time
    this.time.delayedCall(2000, () => {
      moodeng.destroy()
    })
  }

  private spawnGoldenMoodeng() {
    const x = Phaser.Math.Between(50, this.cameras.main.width - 50)
    const y = Phaser.Math.Between(50, this.cameras.main.height - 50)
    
    const goldenMoodeng = this.add.image(x, y, 'golden-moodeng')
      .setInteractive()
      .setScale(0.8)
    
    goldenMoodeng.on('pointerdown', () => {
      this.onScoreUpdate(5)
      goldenMoodeng.destroy()
    })
    
    // Make it disappear faster than regular Moodengs
    this.time.delayedCall(1500, () => {
      goldenMoodeng.destroy()
    })
  }
}

export function createGame(config: GameConfig): PopMoodengGame {
  const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: config.containerId,
    width: 800,
    height: 450,
    backgroundColor: '#ffffff',
    scene: new MoodengScene(config)
  }

  const game = new Phaser.Game(gameConfig)

  return {
    destroy: () => {
      game.destroy(true)
    }
  }
}
