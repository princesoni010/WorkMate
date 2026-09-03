const AuditLog = require('../models/AuditLog');

async function createAuditLog({ actorId, action, entityType, entityId, reason, metadata }) {
  const auditLog = new AuditLog({
    actorId,
    action,
    entityType,
    entityId,
    reason,
    metadata
  });
  
  await auditLog.save();
  return auditLog;
}

module.exports = {
  createAuditLog
};
