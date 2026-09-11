import React, { useState, useEffect } from 'react'
import {
  IoPeopleOutline,
  IoPersonAddOutline,
  IoShieldCheckmarkOutline,
  IoMailOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5'
import StatusBadge from '../../components/player/ui/StatusBadge'
import EmptyState from '../../components/player/ui/EmptyState'
import Modal from '../../components/player/ui/Modal'
import { playerService } from '../../services/playerService'

export default function TeamsPage({ onNavigate, demoMode }) {
  const [team, setTeam] = useState(null)
  const [activeTab, setActiveTab] = useState('roster') // roster | invites
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamTag, setNewTeamTag] = useState('')

  useEffect(() => {
    async function load() {
      const data = await playerService.getTeamData(demoMode)
      setTeam(data)
    }
    load()
  }, [demoMode])

  if (!team) {
    return (
      <div className="player-subpage">
        <div className="player-subpage-header">
          <div>
            <h1 className="player-subpage-title">Teams</h1>
            <p className="player-subpage-desc">Create or join a verified team to enter squad competitions.</p>
          </div>
        </div>

        <EmptyState
          icon={<IoPeopleOutline size={26} />}
          title="You are not in a squad"
          description="Build your squad with trusted teammates or join an existing roster to participate in 4-player tournaments."
          actionLabel="Create a Squad"
          onAction={() => setCreateModalOpen(true)}
        />

        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Register New Squad"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                Squad Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Predators"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="player-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                Squad Clan Tag (3-4 characters)
              </label>
              <input
                type="text"
                placeholder="e.g. APX"
                value={newTeamTag}
                onChange={(e) => setNewTeamTag(e.target.value)}
                className="player-input"
                maxLength={4}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#6B7078' }}>
              As creator, you will become the Team Captain and can invite up to 4 other verified players.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setCreateModalOpen(false)} className="btn btn--secondary" style={{ height: '36px' }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setCreateModalOpen(false)
                  alert('Squad created successfully.')
                }}
                className="btn btn--primary"
                style={{ height: '36px' }}
              >
                Confirm Creation
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className="player-subpage">
      {/* ── 1. Page Header ── */}
      <div className="player-subpage-header">
        <div>
          <h1 className="player-subpage-title">{team.name}</h1>
          <p className="player-subpage-desc">
            Manage your competitive team and roster.
          </p>
        </div>
      </div>

      {/* ── 2. Squad Summary Banner Card ── */}
      <div className="player-team-summary-card">
        <div className="player-team-summary-card__header">
          <div className="player-team-summary-card__brand">
            <span className="player-team-tag-pill">[{team.tag}]</span>
            <div>
              <h2 className="player-team-summary-card__name">{team.name}</h2>
              <div className="player-team-summary-card__meta">
                <span>Captain: <strong>{team.captain}</strong></span>
                <span className="player-bullet">•</span>
                <span>Founded {team.createdDate}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={team.status} size="sm" />
        </div>

        <div className="player-team-summary-card__stats-grid">
          <div className="player-team-stat-box">
            <span className="player-team-stat-box__val">{team.record?.tournamentsEntered || 0}</span>
            <span className="player-team-stat-box__lbl">Tournaments</span>
          </div>
          <div className="player-team-stat-box">
            <span className="player-team-stat-box__val player-team-stat-box__val--gold">{team.record?.wins || 0}</span>
            <span className="player-team-stat-box__lbl">Squad Wins</span>
          </div>
          <div className="player-team-stat-box">
            <span className="player-team-stat-box__val">{team.record?.winRate || '0%'}</span>
            <span className="player-team-stat-box__lbl">Win Rate</span>
          </div>
        </div>
      </div>

      {/* ── 3. Tabs Bar ── */}
      <div className="player-tabs-bar">
        <button
          className={`player-tab-btn ${activeTab === 'roster' ? 'active' : ''}`}
          onClick={() => setActiveTab('roster')}
        >
          Active Roster ({team.roster?.length || 0})
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'invites' ? 'active' : ''}`}
          onClick={() => setActiveTab('invites')}
        >
          Invitations ({team.invitations?.length || 0})
        </button>
      </div>

      {/* ── 4. Content Area ── */}
      {activeTab === 'roster' ? (
        <div className="player-roster-clean-stack">
          {team.roster?.map((member) => (
            <div key={member.ign} className="player-roster-card">
              <div className="player-roster-card__top">
                <div className="player-roster-card__identity">
                  <div className="player-roster-card__ign-row">
                    <span className="player-roster-card__ign">{member.ign}</span>
                    {member.isCurrentUser && <span className="player-pill player-pill--gold">You</span>}
                    {member.isCaptain && <span className="player-pill player-pill--solid">Captain</span>}
                  </div>
                  <div className="player-roster-card__role">{member.role}</div>
                </div>
                <StatusBadge status={member.status} size="sm" />
              </div>

              <div className="player-roster-card__footer">
                <span className="player-roster-card__uid-label">Free Fire UID:</span>
                <span className="player-roster-card__uid-val">{member.freeFireUid}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="player-invitations-clean-stack">
          {team.invitations && team.invitations.length > 0 ? (
            team.invitations.map((inv) => (
              <div key={inv.id} className="player-invitation-card">
                <div className="player-invitation-card__info">
                  <h3 className="player-invitation-card__title">
                    Invitation from {inv.teamName}
                  </h3>
                  <p className="player-invitation-card__meta">
                    Invited by {inv.invitedBy} to join as {inv.roleOffered} · {inv.date}
                  </p>
                </div>

                <div className="player-invitation-card__actions">
                  <button className="btn btn--secondary player-invitation-btn">
                    Decline
                  </button>
                  <button className="btn btn--primary player-invitation-btn">
                    Accept Invitation
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={<IoMailOutline size={26} />}
              title="No pending invitations"
              description="Invitations from other squads and clan recruitment offers will appear here."
            />
          )}
        </div>
      )}
    </div>
  )
}
