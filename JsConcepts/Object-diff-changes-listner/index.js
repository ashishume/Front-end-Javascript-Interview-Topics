const originalVersion = {
  user: {
    id: 1,
    name: 'John',
    age: 28,
    address: {
      city: 'Delhi',
      country: 'India'
    },
    skills: ['JavaScript', 'React']
  },
  settings: {
    theme: 'light',
    notifications: true
  }
};

const updatedVersion = {
  user: {
    id: 1,
    name: 'John Doe',
    age: 29,
    address: {
      city: 'Bangalore',
      country: 'India',
      pincode: '560001'
    },
    skills: ['JavaScript', 'React', 'TypeScript']
  },
  settings: {
    theme: 'dark'
  },
  permissions: {
    admin: true
  }
};

function diffObjects(oldObj, newObj, path = '') {
  const changes = [];

  // Handle arrays separately
  if (Array.isArray(oldObj) || Array.isArray(newObj)) {
    const maxLength = Math.max(oldObj?.length || 0, newObj?.length || 0);

    for (let i = 0; i < maxLength; i++) {
      const currentPath = `${path}[${i}]`;

      if (i >= (oldObj?.length || 0)) {
        changes.push({
          type: 'add',
          path: currentPath,
          value: newObj[i]
        });
      } else if (i >= (newObj?.length || 0)) {
        changes.push({
          type: 'remove',
          path: currentPath,
          oldValue: oldObj[i]
        });
      } else {
        changes.push(...diffObjects(oldObj[i], newObj[i], currentPath));
      }
    }

    return changes;
  }

  // Primitive comparison
  if (
    oldObj === null ||
    newObj === null ||
    typeof oldObj !== 'object' ||
    typeof newObj !== 'object'
  ) {
    if (oldObj !== newObj) {
      changes.push({
        type: 'update',
        path,
        oldValue: oldObj,
        newValue: newObj
      });
    }
    return changes;
  }

  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;

    if (!(key in oldObj)) {
      changes.push({
        type: 'add',
        path: currentPath,
        value: newObj[key]
      });
    } else if (!(key in newObj)) {
      changes.push({
        type: 'remove',
        path: currentPath,
        oldValue: oldObj[key]
      });
    } else {
      changes.push(...diffObjects(oldObj[key], newObj[key], currentPath));
    }
  }

  return changes;
}

// Usage
const result = diffObjects(originalVersion, updatedVersion);
console.log(result);
