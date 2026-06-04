const express = require('express');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Available models with their characteristics
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const MODELS = {
  opus: {
    name: 'Opus 4.8',
    tier: 'premium',
    capability: 'highest',
    speed: 'slower',
    costFactor: 1.0
  },
  sonnet: {
    name: 'Sonnet 4.6',
    tier: 'mid',
    capability: 'high',
    speed: 'balanced',
    costFactor: 0.6
  },
  haiku: {
    name: 'Haiku 4.5',
    tier: 'fast',
    capability: 'capable',
    speed: 'fast',
    costFactor: 0.1
  }
};

app.get('/api/models', (req, res) => {
  const models = Object.entries(MODELS).map(([key, value]) => ({
    id: key,
    ...value
  }));
  res.json({ models, lastUpdated: new Date().toISOString() });
});

app.post('/analyze', async (req, res) => {
  const { requirement } = req.body;

  if (!requirement || requirement.trim().length === 0) {
    return res.json({
      model: 'haiku',
      thinking: false,
      budget: null,
      reasoning: 'Empty requirement provided.'
    });
  }

  const text = requirement.toLowerCase();

  // Analyze the requirement to determine complexity
  const complexityIndicators = {
    highComplexity: ['analyze', 'deep', 'research', 'reasoning', 'debug', 'optimize', 'architecture', 'design', 'complex', 'challenging', 'difficult', 'large codebase', 'understand', 'explain in detail', 'comprehensive'],
    mediumComplexity: ['generate', 'write', 'create', 'refactor', 'improve', 'fix', 'implement', 'build', 'modify', 'update'],
    lowComplexity: ['simple', 'quick', 'format', 'convert', 'list', 'summarize', 'brief', 'explain', 'what is', 'how to', 'small']
  };

  const hasHighComplexity = complexityIndicators.highComplexity.some(indicator => text.includes(indicator));
  const hasMediumComplexity = complexityIndicators.mediumComplexity.some(indicator => text.includes(indicator));
  const hasLowComplexity = complexityIndicators.lowComplexity.some(indicator => text.includes(indicator));

  const requirementLength = requirement.length;
  const hasCode = /```|function|class|const |let |var |def |import |return |if |for |while /.test(requirement);
  const hasAnalysis = /analyze|research|investigate|compare|evaluate|assess/.test(text);
  const hasCreative = /create|generate|write|design|imagine|brainstorm/.test(text);

  let recommendation = {
    model: 'haiku',
    thinking: false,
    budget: null,
    reasoning: ''
  };

  // Decision logic based on indicators
  if (hasHighComplexity || (hasAnalysis && requirementLength > 500) || hasCode && hasAnalysis) {
    recommendation.model = 'opus';
    recommendation.thinking = true;
    recommendation.budget = 'medium';
    recommendation.reasoning = 'Complex analysis/reasoning task requires deep thinking. Opus with medium budget recommended.';
  } else if (hasMediumComplexity && requirementLength > 300) {
    if (hasCode || hasAnalysis) {
      recommendation.model = 'sonnet';
      recommendation.thinking = true;
      recommendation.budget = 'low';
      recommendation.reasoning = 'Moderate complexity task. Sonnet with light thinking enabled.';
    } else {
      recommendation.model = 'sonnet';
      recommendation.thinking = false;
      recommendation.reasoning = 'Standard creative/implementation task. Sonnet without thinking.';
    }
  } else if (hasCreative && !hasCode) {
    recommendation.model = 'haiku';
    recommendation.thinking = false;
    recommendation.reasoning = 'Creative writing/generation task. Haiku is efficient for this.';
  } else if (hasCode) {
    recommendation.model = 'sonnet';
    recommendation.thinking = false;
    recommendation.reasoning = 'Code-related task. Sonnet provides good balance for coding.';
  } else if (requirementLength < 100) {
    recommendation.model = 'haiku';
    recommendation.thinking = false;
    recommendation.reasoning = 'Simple, short task. Haiku is perfect here.';
  } else if (requirementLength > 1000) {
    recommendation.model = 'sonnet';
    recommendation.thinking = false;
    recommendation.reasoning = 'Longer context. Sonnet recommended for better handling.';
  }

  res.json(recommendation);
});

// Health check endpoint for deployment monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Model selector running at http://localhost:${PORT}`);
});
